from django.db.models.fields import NullBooleanField
from django.utils.regex_helper import contains
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
from django.contrib.auth.hashers import check_password
import jwt

# Authentication Views
class MiddleWare(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format = None):
        print(request.headers)
        return Response('OK', status = status.HTTP_200_OK)
    

class SignInView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.DriverSignInSerializer
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            instanceDriver = models.Driver.objects.filter(username = serializer.validated_data['username'])
            if check_password(serializer.validated_data['password'], instanceDriver[0].password):
                refreshToken = TokenObtainPairSerializer.get_token(instanceDriver[0])
                driverSerializer = serializers.DriverSerializer(instanceDriver[0])
                data = {
                    'refresh_token': str(refreshToken),
                    'access_token': str(refreshToken.access_token),
                    'driver': driverSerializer.data
                }
                print(data)
                return Response(data, status = status.HTTP_200_OK)
            return Response({'error': 'No user found!'}, status = status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Password or email is invalid!'}, status = status.HTTP_400_BAD_REQUEST)
    
# Functional Views

class DriverView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.DriverSerializer
    
    def post(self, request, format = None):
        print(request.data)
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
           serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
           serializer.save()
           return Response({'status': 'Created'}, status = status.HTTP_201_CREATED)
        return Response({'error': 'There are some errors! Please try again later!'}, status = status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format = None):
        token = request.headers['Authorization']
        payload = jwt.decode(jwt=token[7: len(token)], key=settings.SECRET_KEY, algorithms=['HS256'])
        instanceDriver = models.Driver.objects.filter(id = payload['user_id'])
        if len(instanceDriver) > 0:
            serializer = self.serializer_class(instanceDriver[0])
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    
class UpdateDriverInformationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UpdateDriverSerializer
    
    def post(self, request, format = None):
        token = request.headers['Authorization']
        payload = jwt.decode(jwt = token[7: len(token)], key = settings.SECRET_KEY, algorithms = ['HS256'])
        instanceDriver = models.Driver.objects.filter(id = payload['user_id'])
        request.data['password'] = make_password(request.data['password']) 
        serializer = serializers.UpdateDriverSerializer(instanceDriver[0], data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Update', status = status.HTTP_200_OK)
        print(serializer.errors)
        return Response({'error': 'Errors!'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class LocationUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.LocationUpdateSerializer
    
    def get(self, request, format = None):
        driverId = request.query_params.get('driver_id')
        instanceDriver = models.Driver.objects.filter(id = driverId)
        if len(instanceDriver) > 0:
            # Get lastest order
            orders = instanceDriver[0].order_set.all()
            lastestOrder = orders[0]
            updateLocation = lastestOrder.locationupdate_set.all()
            if len(updateLocation) > 0:
                tmpArr = []
                for item in updateLocation:
                    tmpArr.append(item)
                    serializer = self.serializer_class(tmpArr, many = True)
                return Response(serializer.data, status = status.HTTP_200_OK)
        return Response('Errors!', status = status.HTTP_404_BAD_REQUEST)
    
    def post(self, request, format = None):
        orderId = request.data['order_id']
        detailAddress = request.data['detail_address']
        province = request.data['province']
        instanceOrder = models.Order.objects.filter(id = orderId)
        if len(instanceOrder) > 0:
            instanceAddress = instanceOrder[0].instanceaddress_set.all()
            if len(instanceAddress) > 0:
                serializer = serializers.UpdateInstanceAddressSerializer(instanceAddress[0], {'detail_address': detailAddress, 'province': province})
                serializer.save()
                return Response({'status': 'Updated'}, status = status.HTTP_200_OK)
            return Response({'error': 'Cannot found!'}, status = status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Cannot found!'}, status = status.HTTP_404_NOT_FOUND)
    
    
class OrderDriver(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.RequestSerializer
    
    def get(self, request, format = None):
        driverId = request.query_params.get('driver_id')
        instanceDriver = models.Driver.objects.filter(id = driverId)
        if len(instanceDriver) > 0:
            orders = instanceDriver[0].order_set.all().filter(isRecieved = True, isDone = False)
            serializer = self.serializer_class(orders[0].request_set.all(), many = True)
            print(serializer.data)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({'error': 'Error'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class InstanceOrdereView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        orders = models.Order.objects.filter(isRecieved = False)
        serializer = serializers.OrderSerializer(orders, many = True)
        return Response(serializer.data, status = status.HTTP_200_OK)


class SetDriverOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UpdateDriverOrderSerilizer
    
    def post(self, request, format = None):
        token = request.headers['Authorization']
        payload = jwt.decode(jwt = token[7: len(token)], key = settings.SECRET_KEY, algorithms = ['HS256'])
        instanceDriver = models.Driver.objects.filter(id = payload['user_id'])
        ordersOfDrivers = instanceDriver[0].order_set.all()
        for order in ordersOfDrivers:
            if order.isDone == False:
                return Response({'msg': 'Driver is in another order.'}, status = status.HTTP_400_BAD_REQUEST)
        orderId = request.data['orderId']
        instanceOrders = models.Order.objects.filter(id = orderId)
        serializer = self.serializer_class(instanceOrders[0], data = {'driver': instanceDriver[0].id, 'isRecieved': True})
        
        orders = models.Order.objects.filter(isRecieved = False)
        resSerializer = serializers.OrderSerializer(orders, many = True)
        if serializer.is_valid():
            serializer.save()
            print(resSerializer.data)
            return Response(resSerializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class InstanceOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializers_class = serializers.InstanceAddressSerilizer
    
    def get(self, request, format = None):
        orderId = request.query_params.get('order_id')
        instanceOrder = models.Order.objects.filter(id = orderId)
        if len(instanceOrder) > 0:
            instanceAddress = instanceOrder[0].instanceaddress_set.all()
            serializer = self.serializers_class(instanceAddress[0])
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({'status': 'Cannot found!'}, status = status.HTTP_404_NOT_FOUND)