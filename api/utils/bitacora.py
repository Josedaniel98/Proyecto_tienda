# coding=utf-8
import json
from decimal import Decimal
from datetime import date, datetime

from api.models import Bitacora

#from django.contrib.auth.models import User  # Done

class RegistroBitacora:
    def __init__(self):
        """"""

    @staticmethod
    def to_json(objeto):
        """
        Funcion para pasar el diciconario a objeto
        :type objeto: dict
        :param objeto:
        :return: dict
        """
        if objeto:
            for llave in objeto.keys():
                if type(objeto[llave]) is Decimal:
                    objeto[llave] = float(objeto[llave])
                elif type(objeto[llave]) is list:
                    for i, item in enumerate(objeto[llave]):
                        objeto[llave][i] = RegistroBitacora.to_json(item)
                elif type(objeto[llave]) is date:
                    objeto[llave] = objeto[llave].strftime("%d/%m/%Y %H:%M")
                elif type(objeto[llave]) is datetime:
                    objeto[llave] = objeto[llave].strftime("%d/%m/%Y")
                # else:
                #     print(type(objeto[llave]))
        return json.dumps(objeto)

    @staticmethod
    def login(usuario):
        """
        Login
        :type usuario: User
        :param usuario:
        :return:
        """
        Bitacora.objects.create(
            accion="Login",
            usuario=usuario
        )

    #Bitácora de la empresa
    @staticmethod
    def register( user, instance='', previous_instance=None, action=None):

        """
        Login
        :type usuario: User
        :param usuario:
        :return:
        """
        # if previous_instance is None:
        Bitacora.objects.create(
            action=action,
            user=user,
            # currentData=RegistroBitacora.to_json(instance),
            currentData=RegistroBitacora.to_json(instance),
            previousData=RegistroBitacora.to_json(previous_instance)
        )
        # else:
        #     Bitacora.objects.create(
        #         action=action,
        #         user=user,
        #         currentData=RegistroBitacora.to_json(instance),
        #         previousData=RegistroBitacora.to_json(previous_instance)
        #     )

        

