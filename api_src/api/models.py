from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class Sex(models.Model):
    name = models.CharField(max_length = 255, unique = True, null = False)
    
    def __str__(self):
        return self.name
    

class MyUserManager(BaseUserManager):
    def create_user(self, 
                    email, 
                    customer_name, 
                    date_of_birth, 
                    sex, 
                    phone_numner, 
                    address, 
                    province, 
                    district, 
                    ward, 
                    bank_name, 
                    bank_number, 
                    bank_provine, 
                    password = None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            customer_name = customer_name,
            date_of_birth = date_of_birth,
            sex = sex,
            phone_numner = phone_numner,
            address = address,
            province = province,
            district = district, 
            ward = ward, 
            bank_name = bank_name, 
            bank_number = bank_number, 
            bank_provine = bank_provine,
        )

        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, 
                            email, 
                            customer_name, 
                            date_of_birth, 
                            sex, 
                            phone_numner, 
                            address, 
                            province, 
                            district, 
                            ward, 
                            bank_name, 
                            bank_number, 
                            bank_provine, 
                            password = None):
        user = self.create_user(
            email = email,
            customer_name = customer_name,
            date_of_birth = date_of_birth,
            sex = sex,
            phone_numner = phone_numner,
            address = address,
            province = province,
            district = district, 
            ward = ward, 
            bank_name = bank_name, 
            bank_number = bank_number, 
            bank_provine = bank_provine,
            password = password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user


class Customer(AbstractBaseUser):
    email = models.EmailField(
        verbose_name = 'email address',
        max_length = 255,
        unique = True,
    )
    customer_name = models.CharField(max_length = 255, unique = True, null = True)
    date_of_birth = models.CharField(max_length = 20)
    sex = models.ForeignKey(Sex, related_name = 'customers_sex', on_delete = models.CASCADE)
    phone_numner = models.IntegerField()
    address = models.CharField(max_length = 255, null = False)
    province = models.CharField(max_length = 255, null = False)
    district = models.CharField(max_length = 255, null = False)
    ward = models.CharField(max_length = 255, null = False)
    bank_name = models.CharField(max_length = 255, unique = True, null = True)
    bank_number = models.IntegerField()
    bank_provine = models.CharField(max_length = 255, null = False)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    
    objects = MyUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
                        'customer_name', 
                        'date_of_birth', 
                        'sex', 
                        'phone_numner', 
                        'address',
                        'province',
                        'district',
                        'ward',
                        'bank_name',
                        'bank_number',
                        'bank_provine',
                        ]
    
    def __str__(self):
        return str(self.email)

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
    
    def has_perm(self, perm, obj = None):
        return True

    def has_module_perms(self, app_label):
        return True   