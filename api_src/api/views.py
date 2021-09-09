from rest_framework.serializers import Serializer
from . import models, serializers
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import permissions, status
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication


# Authentication classes

class MiddleWare(APIView):
    permission_classes = [permissions.permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        return Response(request.user.email, status = status.HTTP_200_OK)