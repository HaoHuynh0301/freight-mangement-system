from rest_framework.serializers import Serializer
from . import models, serializers
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import permissions, status
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

class DriverView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.DriverSerializer
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        print(serializer.data)
        if serializer.is_valid():
           serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
           serializer.save()
           return Response({'status': 'Created'}, status = status.HTTP_201_CREATED)
        return Response({'error': 'There are some errors! Please try again later!'}, status = status.HTTP_400_BAD_REQUEST)