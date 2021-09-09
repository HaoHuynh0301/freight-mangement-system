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
    

class SignInView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.SignInSerializer
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            User = authenticate(
                request,
                email = serializer.validated_data['email'],
                password = serializer.validated_data['passoword']
            )
            if User:
                refreshToken = TokenObtainPairSerializer.get_token(User)
                data = {
                    'refresh_token': str(refreshToken),
                    'access_token': str(refreshToken.access_token),
                    'email': str(User.email)
                }
                return Response(data, status = status.HTTP_200_OK)
            return Response({'error': 'No user found!'}, status = status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Password or email is invalid!'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.CustomerSerializer
    
    def post(self, request, format = None):
        serializer = self.serializer_class(request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['passoword'])
            serializer.save()
            return Response({'status': 'CREATED'}, status = status.HTTP_201_CREATED)
        return Response({'error': 'Password or email is invalid!'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class UpdatePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, format = None):
        try:
            newPassword = request.data['password']
            userInstance = request.user
            userInstance.set_password(newPassword)
            userInstance.save()
            return Response({'mes': 'Your password was updated!'}, status = status.HTTP_200_OK)
        except:
            return Response({'error': 'We are having some errors, please try later!'}, status = status.HTTP_400_BAD_REQUEST)