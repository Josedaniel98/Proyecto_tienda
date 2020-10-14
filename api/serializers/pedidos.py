
# Django REST framework
from rest_framework import serializers

# Model
from api.models import Articulo
from api.models import Pedido

class ArticuloReadSerializer( serializers.ModelSerializer ):
    
    class Meta:
        model = Articulo
        fields = ('id','nombre','descripcion','precio')

class PedidoReadSerializer( serializers.ModelSerializer ):
    cliente = serializers.SerializerMethodField("getClientes")

    articulos = ArticuloReadSerializer(many=True)
    class Meta:
        model = Pedido
        fields = '__all__'

    def getCliente(self, obj):
        return {'id': obj.cliente.cliente_id, 'nombre': obj.cliente.nombre, 'direccion':obj.cliente.direccion}

class PedidoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ('fecha', 'articulos','cliente', 'total')        