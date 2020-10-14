""" Fabricas ViewSet """

# Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


# Model
from api.models.fabricas import Fabrica

# Serializers
from api.serializers.fabricas import FabricaModelSerializer, FabricaRegisterSerializer

from django.db import transaction

class FabricaViewSet(viewsets.ModelViewSet):

    queryset = Fabrica.objects.filter(is_active=True)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return FabricaModelSerializer
        else:
            return FabricaRegisterSerializer

    def destroy(self, request, *args, **kwargs):
        try: 
            instancia=self.get_object()
            instancia.is_active = False
            instancia.save()
            return Response({'': str(e)}, status=status.HTTP_208_OK)
        except Exception as e:
               return Response({'detail': str(e)}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='search/(?P<name>[-a-zA-Z0-9_]+)')
    def search(self, request, name):

        fabricas = Fabrica.objects.filter(
            is_active=True, name__contains=nombre)
        page = self.paginate_queryset(fabricas)
        serializer = self.get_serializer(page, many=True)

        return self.get_paginated_response(serializer.data)
