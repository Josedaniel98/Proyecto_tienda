import json
from datetime import timedelta

from django.conf import settings
from django.core.files import File
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
# from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

# Model
from api.models.users import User

from api.models import Profile

from api.serializers import UserSerializer, UserReadSerializer, UserPermissionReadSerializer
# emial
from django.core import mail
# jwt
import jwt

# Utilities
import random
from string import digits



class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action in ["create", "token", "email_reset_pwd", "verify_token_pwd", 'reset_pwd']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):

        try:

            
            if serializer.is_valid():
            
                serializer.save()

                # Asignar contraseña aleatorio
                usuario = User.objects.get(email= request.data['email'] )
                password = ''.join( random.choices(digits,k=10) )
                usuario.set_password( password )

                usuario.save()

                # Envío del email con el password
                self.send_email_password(usuario, password)

                return Response({
                    'usuario': serializer.data,
                    'password': password
                }, status=status.HTTP_201_CREATED)

        
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "the chosen username in not available, please pick another"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.username = data["username"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data

        try:
            user = User.objects.get(email=data["email"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserPermissionReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"},
                            status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def email_reset_pwd(self, request):
        data = request.data
        user = get_object_or_404(User, email=data['email'])
        self.send_reset_pwd_email(user)
        return Response(status=status.HTTP_200_OK)

    def send_reset_pwd_email(self, user):
        token = self.generate_token(user)
        link = settings.URL_CRM+'reset_pwd/' + token
        subject = f'Hola! ${user} has solicitado cambio de contraseña'
        from_email = 'Alig CRM <noreply@school.com>'
        content = render_to_string(
            'emails/users/reset_pwd.html',
            {'link': link, 'user': user}
        )
        msg = EmailMultiAlternatives(
            subject, content, from_email, [user.email])
        msg.attach_alternative(content, "text/html")
        msg.send()

    def send_email_password(self, user, password ):

        subject = f'Bienvenido ${user.first_name} a Ciancoders CRM'
        from_email = 'Ciancoders CRM <noreply@school.com>'
        content = render_to_string(
            'emails/users/send_pwd.html',
            {'password': password, 'user': user}
        )
        msg = EmailMultiAlternatives(
            subject, content, from_email, [user.email])
        msg.attach_alternative(content, "text/html")
        msg.send()

    def generate_token(self, user):
        """Function to generate the token"""
        exp_date = timezone.now() + timedelta(days=3)
        payload = {
            'user_mail': user.email,
            'exp': int(exp_date.timestamp()),
            'type': 'reset_password'
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return token.decode()

    @action(detail=False, methods=['post'])
    def verify_token_pwd(self, request):
        data = request.data
        # ---Verifica si el token enviado es valido
        try:
            payload = jwt.decode(
                data['token'], settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignature:
            message = {
                'message': 'El link de recuperacion de contraseña ha expirado'}
            return Response(data=message, status=status.HTTP_404_NOT_FOUND)
        except jwt.PyJWTError:
            message = {'message': 'Link Ivalido'}
            return Response(data=message, status=status.HTTP_404_NOT_FOUND)
        if payload['type'] != 'reset_password':
            message = {'message': 'Link Invalido'}
            return Response(data=message, status=status.HTTP_404_NOT_FOUND)
        # ---Obtenemos el usuario con la informacion del token
        # user = get_object_or_404(User, email=payload['user_mail'])
        # user.set_password(data['pwd'])
        # user.save()
        message = {'is_valid_token': 'El token es exitoso!',
                   "user_email": payload['user_mail']}
        return Response(data=message, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def reset_pwd(self, request):
        data = request.data
        user = get_object_or_404(User, email=data['email'])
        user.set_password(data['password'])

        # Change state verified 
        is_verfied = data.get('is_verified')
        if is_verfied:
            user.is_verified = True

        user.save()

        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def change_pwd(self, request):
        data = request.data
        user = request.user
        try:
            if(user.check_password(data['oldPassword'])):
                user.set_password(data['newPassword'])
                user.save()
                message = {'detail': 'Actualización de contraseña exitosa!'}
            else:
                raise Exception('Tu contraseña actual es incorrecta')
        except Exception as error:
            return Response({'detail': str(error)},
                            status=status.HTTP_404_NOT_FOUND)
        return Response(message, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try: 
            instancia=self.get_object()
            instancia.is_active = False
            instancia.save()
            return Response({'': str(e)}, status=status.HTTP_208_OK)
        except Exception as e:
               return Response({'detail': str(e)}, status=status.HTTP_204_NO_CONTENT)
