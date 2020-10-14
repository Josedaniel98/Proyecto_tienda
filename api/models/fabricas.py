""" MODEL fabricas """

from django.db import models
from api.utils.baseModel import BaseModel


class Fabrica(BaseModel):
    nombre = models.CharField(max_length=50, null=False)
    telefono = models.IntegerField( null=False)      
    
    def __str__(self):
        return self.nombre
