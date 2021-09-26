import re
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

# Authentication classes

class MiddleWare(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
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
                password = serializer.validated_data['password']
            )
            if User:
                refreshToken = TokenObtainPairSerializer.get_token(User)
                userSerializer = serializers.CustomerSerializer(User)
                data = {
                    'refresh_token': str(refreshToken),
                    'access_token': str(refreshToken.access_token),
                    'user': userSerializer.data
                }
                print(data)
                return Response(data, status = status.HTTP_200_OK)
            return Response({'error': 'No user found!'}, status = status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Password or email is invalid!'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.CustomerSerializer
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            print('OK')
            serializer.save()
            return Response({'status': 'CREATED'}, status = status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    
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
        

# ================================================================ #


class UserInformationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.CustomerSerializer
    
    def get(self, request, format = None):
        userInstance = request.user
        print(userInstance)
        serializer = self.serializer_class(userInstance)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def post(self, request, format = None):
        userInstance = request.user
        request.data['password'] = make_password(request.data['password']) 
        serializer = serializers.BasicCustomerInformation(userInstance, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Update', status = status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class BankingInformation(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.BankCustomerSerializer
    
    def post(self, request, format = None):
        userInstance = request.user
        serializer = self.serializer_class(userInstance, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Updated'}, status = status.HTTP_200_OK)
        print(serializer.errors)
        return Response({'error': serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    
class LocationInformation(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.LocationCustomerSerializer
    
    def post(self, request, format = None):
        userInstance = request.user
        serializer = self.serializer_class(userInstance, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Updated'}, status = status.HTTP_200_OK)
        print(serializer.errors)
        return Response({'error': serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    
class OrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.OrderSerializer
    
    def post(self, request, format = None):
        userInstance = request.user
        shipOption = models.ShipOptions.objects.get(id = request.data.get('shipOptionId'))
        statusInstance = models.OrderStatus.objects.get(id = request.data['statusId'])
        newOrder = models.Order.objects.create (
                                                    account = userInstance,
                                                    ship_option = shipOption,
                                                    status = statusInstance,
                                                    customer_phonenumber = request.data.get('cus_phonenumber'),
                                                    customer_name = request.data.get('cus_name'),
                                                    detail_address = request.data.get('address'),
                                                    product_name = request.data.get('product_name'),
                                                    product_weight = request.data.get('product_weight'),
                                                    product_quantity = request.data.get('product_quantity'),
                                                    cast = request.data.get('cast'),
                                                    note = request.data.get('note'),
                                                    province = request.data.get('province'),
                                                    district = request.data.get('district'),
                                                    ward = request.data.get('ward'),
                                                )
        return Response('OK', status = status.HTTP_200_OK)
    
    def get(self, request, format = None):
        userInstance = request.user
        accountOrders = userInstance.account_order.all()
        serializers = self.serializer_class(accountOrders, many = True)
        return Response(serializers.data, status = status.HTTP_200_OK)
    
    
class RequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_order_object(self, id = None):
        return get_object_or_404(models.Order, id = id)
    
    def get_request_option_object(self, id = None):
        return get_object_or_404(models.RequestOption, id = id)
    
    def get(self, request, format = None):
        orderId = request.query_params.get('orderId')
        requestId = request.query_params.get('rqId')
        orderInstance = self.get_order_object(orderId)
        requestOptionInstance = self.get_request_option_object(requestId)
        if orderInstance is not None and requestOptionInstance is not None:
            newRequest = models.Request.objects.create(order = orderInstance, request_option = requestOptionInstance)
            return Response({'status': 'New request was created!'}, status = status.HTTP_201_CREATED)
        return Response({'error': 'Order or request option is invalid!'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class PaidMoneyView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        userInstance = request.user
        orders = userInstance.account_order.all()
        moneyStatus = request.query_params.get('money-status');
        totalMoney = 0.0 
        
        # 1 is paid-money
        if moneyStatus == str(1):
            for order in orders:
                if order.status.id == 5:
                    totalMoney += order.cast
                    
        # 2 is un-paid-money
        if moneyStatus == str(2):
            for order in orders:
                if order.status.id == 1:
                    totalMoney += order.cast
        
        # 3 is shipping-money
        if moneyStatus == str(3):
            for order in orders:
                totalMoney += order.ship_option.fee
                
        print(totalMoney)
        return Response({'paid_money': totalMoney}, status = status.HTTP_200_OK)
    
    
class TotalOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        userInstance = request.user
        orders = userInstance.account_order.all()
        totalOrdersStatus = request.query_params.get('order-status');
        totalOrders = 0
        
        # 1 is number of delivered orders
        if totalOrdersStatus == str(1):
            for order in orders:
                if order.status.id >= 4 and order.status.id != 6:
                    totalOrders += 1
                    
        # 2 is number of undelivered orders
        elif totalOrdersStatus == str(2):
            for order in orders:
                if order.status.id == 6:
                    totalOrders += 1
                    
        # 2 is number of doi tra yeu cau
        elif totalOrdersStatus == str(3):
            for order in orders:
                requests = order.request_set.all()
                if len(requests) != 0:
                    for requestt in requests:
                        if requestt.request_option.id == 3:
                            totalOrders += 1
                            break
                    
        print(totalOrders)
        return Response({'total': totalOrders}, status = status.HTTP_200_OK)
    
    
class SpecificOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, format = None):
        requestStatus = request.query_params.get('status')
        userInstance = request.user
        orders = userInstance.account_order.all()
        speOrders = []
        if requestStatus == str(1):
            for order in orders:
                if order.status.id >= 4:
                   speOrders.append(order)
        elif requestStatus == str(2) :
            for order in orders:
                if order.status.id == 6:
                   speOrders.append(order)
        speOrders = serializers.OrderSerializer(speOrders, many = True)
        return Response(speOrders.data, status = status.HTTP_200_OK)      
    
    
class StatusUpdate(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.StatusUpdateSerializer
    
    def get(self, request, format = None):
        orderId = request.query_params.get('order_id')
        userInstance = request.user
        orders = userInstance.account_order.filter(id = orderId)
        if len(orders) > 0:
            updateStatus = orders[0].statusupdate_set.all()
            serializers = self.serializer_class(updateStatus, many = True)
            return Response(serializers.data, status = status.HTTP_200_OK)
        return Response({'status': 'errors'}, status = status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format = None):
        pass
     
