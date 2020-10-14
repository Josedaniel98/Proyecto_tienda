""" Companies ViewSet """

# Django REST framework
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

# Model
from api.models import Articulo

# Serializers
from api.serializers import ArticuloModelSerializer, ArticuloReadModelSerializer, ArticuloRetrieveModelSerializer


class ArticuloViewSet(viewsets.ModelViewSet):

    queryset = Articulo.objects.filter(is_active=True)

    
    def destroy(self, request, *args, **kwargs):
        try: 
            instancia=self.get_object()
            instancia.is_active = False
            instancia.save()
            return Response({'': str(e)}, status=status.HTTP_208_OK)
        except Exception as e:
               return Response({'detail': str(e)}, status=status.HTTP_204_NO_CONTENT)
    def get_serializer_class(self):

        if self.action == 'list':
            return ArticuloReadModelSerializer
        
        elif self.action == 'retrieve':
            return ArticuloRetrieveModelSerializer
        
        return ArticuloModelSerializer
    
    @action(detail=False, methods=['get'], url_path='search/(?P<name>[-a-zA-Z0-9_]+)')
    def search(self, request, name ):
        
        articulos = Articulo.objects.filter(is_active=True, name__contains=nombre)
        page = self.paginate_queryset(articulos)
        serializer = ArticuloReadModelSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)
