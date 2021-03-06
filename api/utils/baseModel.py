""" Model base """

from django.db import models

class BaseModel( models.Model ):

    created   = models.DateTimeField(auto_now_add=True)
    modified  = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True