""" SERIALIZER Articulos """

# Djnago REST framework
from rest_framework import serializers

# Model
from api.models.articulos import  Articulo

class ArticuloModelSerializer( serializers.ModelSerializer ):

    class Meta:
        model  = Articulo
        fields = '__all__'

class ArticuloRetrieveModelSerializer( serializers.ModelSerializer ):

    fabrica = serializers.SerializerMethodField("obj_fabrica")

    class Meta:
        model  = Articulo
        fields = (
            'id',
            'nombre',
            'descripcion',
            'existencia',
            'cantidad',
            'fabrica',
        )
    
    def obj_fabrica(self, obj):
        return {'value': obj.fabrica.id, 'label': obj.fabrica.name}


class ArticuloReadModelSerializer( serializers.ModelSerializer ):

    fabrica = serializers.StringRelatedField(read_only=True)


    class Meta:
        model  = Articulo
        fields = (
            'id',
            'nombre',
            'descripcion',
            'existencia',
            'cantidad',
            'fabrica',
        )
