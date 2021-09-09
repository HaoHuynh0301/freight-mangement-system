from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255, require = True)
    password = serializers.CharField()