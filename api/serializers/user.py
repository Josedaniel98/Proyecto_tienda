""" SERIALIZER User """

# Django REST framework 
from rest_framework import serializers
from rest_framework.validators import UniqueValidator 

# Model
from api.models import User
from api.models import Profile



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'



class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)
    email = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message='The email must be unique')]
    )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'profile',
        )


class UserPermissionReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'is_verified',
            'email',
            'profile',
        )

class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
      
        )
