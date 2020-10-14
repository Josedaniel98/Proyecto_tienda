
# Djnago REST framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator 

# Model
from api.models.fabricas import Fabrica

class FabricaModelSerializer( serializers.ModelSerializer ):

    class Meta:
        model  = Fabrica
        fields = '__all__'

class FabricaRegisterSerializer(serializers.ModelSerializer):

    nombre = serializers.CharField(
        validators=[
            UniqueValidator(queryset=Fabrica.objects.filter(is_active=True), message='The name must be unique')]
    )
    class Meta:
        model = Fabrica
        fields = '__all__'