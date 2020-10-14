
import json
import pdb
# Django
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

from copy import deepcopy

# Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

# Model
from api.models import Cliente

# Serializers
from api.serializers import ClienteRegistroSerializer, ClienteSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('nombre',)
    search_fields = ('nombre',)
    ordering_fields = ('nombre',)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ClienteSerializer
        else:
            return ClienteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def destroy(self, request, *args, **kwargs):
        try: 
            instancia=self.get_object()
            instancia.is_active = False
            instancia.save()
            return Response({'': str(e)}, status=status.HTTP_208_OK)
        except Exception as e:
               return Response({'detail': str(e)}, status=status.HTTP_204_NO_CONTENT)

