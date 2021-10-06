from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class Driver(models.Model):
    name = models.CharField(max_length = 255, null = False, blank = True)
    phone_number = models.CharField(max_length = 12, null = False, blank = True)
    email = models.CharField(max_length = 100, blank = False)
    cmnd = models.CharField(max_length = 12, null = False)
    age = models.IntegerField(default = 18)
    driverLicense = models.CharField(max_length = 20, null = False, blank = False)
    username = models.CharField(max_length = 255, blank = False, null = False)
    password = models.CharField(max_length = 255, blank = False, null = False)
    
    def __str__(self):
        return str(self.name)
    