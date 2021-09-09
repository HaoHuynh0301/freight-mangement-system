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
                    'date_of_birth', 
                    'phone_numner', 
                    'address',
                    'province',
                    'district',
                    'ward',
                    'bank_name',
                    'bank_number',
                    'bank_provine',
                    'email'
                ]