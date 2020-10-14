""" MODEL user """

from django.contrib.auth.models import AbstractUser
from django.db import models


class User( AbstractUser ):
    sales_commission = models.FloatField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)


    def __str__(self):
        return self.username
