from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255, required = True)
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
                    'password'
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
        fieldss = [
            '__all__'
        ]