
from django.db import models
from api.utils.baseModel import BaseModel


class Pedido(BaseModel):
    fecha = models.DateTimeField(null=False)
    total = models.IntegerField(blank=True, null=False)

    # Relationship
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    articulos= models.ManyToManyField('Articulo', related_name='articulo', through='Pedido_detalle')

    def __str__(self):
        return self.cliente, self.total

class Pedido_detalle(models.Model):
        articulo_id=models.ForeignKey('Articulo',  on_delete=models.CASCADE)
        pedido_id=models.ForeignKey(Pedido,  on_delete=models.CASCADE)
        cantidad = models.IntegerField(default=1)
        subtotal = models.FloatField()