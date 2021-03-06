from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User

from . import models

class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255, required = True)
    password = serializers.CharField()
    
    
class DriverSignInSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 255, required = True)
    password = serializers.CharField()
    
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = [  'customer_name', 
                    'phone_numner', 
                    'address',
                    'bank_name',
                    'bank_number',
                    'bank_provine',
                    'email',
                    'bank_username',
                    'password',
                    'province',
                    'district',
                    'ward',
                    'avatar'
                ]
        
        
class BankCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = [
                    'bank_name',
                    'bank_number',
                    'bank_provine',
                    'bank_username',
                ]
        
        
class LocationCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = [
            'customer_name',
            'phone_numner',
            'address',
            'province',
            'district',
            'ward'
        ]
        
        
class BasicCustomerInformation(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = [  'customer_name', 
                    'phone_numner', 
                    'email',
                    'password'
                ]
        
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'
        
        
class StatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StatusUpdate
        fields = '__all__'
        
        
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Request
        fields = '__all__'
        
        
class InstanceAddressSerilizer(serializers.ModelSerializer):
    class Meta:
        model = models.InstanceAddress
        fields = '__all__'
        
        
class UpdateInstanceAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InstanceAddress
        fields = ['latitude', 'longitude']
        
        
class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Driver
        fields = [
            'name',
            'phone_number',
            'email',
            'cmnd',
            'age',
            'driverLicense',
            'username',
            'password',
            'id',
            'avatar'
        ]
        
        
class UpdateDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Driver
        fields = [
            'name',
            'phone_number',
            'email',
            'cmnd',
            'age',
            'driverLicense',
            'password',
            'id',
            'avatar'
        ]
        
        
class LocationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LocationUpdate
        fields = '__all__'
        
        
class UpdateDriverOrderSerilizer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['driver', 'isRecieved', 'status']
        
        
class UpdatePaidOrderSerilizer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['isDone', 'status']
        
        
class updateStatusOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['status']