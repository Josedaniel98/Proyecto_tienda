"""Model Articulo"""

from django.db import models
from api.utils.baseModel import BaseModel


class Articulo(BaseModel):
    nombre = models.CharField(max_length=100,  null=False)
    descripcion = models.CharField(max_length=500,  null=False)
    existencia = models.IntegerField(blank=True, null=False)
    cantidad = models.IntegerField(blank=True, null=True)

    # Relationship
    fabrica = models.ForeignKey('Fabrica', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
