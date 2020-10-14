from django.db import models

from api.utils.baseModel import BaseModel


class Cliente(BaseModel):
    nombre= models.CharField(max_length=40, null=False)
    telefono=models.IntegerField(null=False)
    saldo=models.FloatField(null=False)
    credito=models.IntegerField(null=False)
    descuento=models.FloatField(null=True)  
    direccion=models.CharField(max_length=50, null=False)

       
    def __str__(self):
        return self.nombre
