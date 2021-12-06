from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class MyUserManager(BaseUserManager):
    def create_user(self, 
                    email, 
                    customer_name, 
                    date_of_birth, 
                    phone_numner, 
                    address, 
                    province, 
                    district, 
                    ward, 
                    bank_name, 
                    bank_number, 
                    bank_provine, 
                    bank_username,
                    password = None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            customer_name = customer_name,
            date_of_birth = date_of_birth,
            phone_numner = phone_numner,
            address = address,
            province = province,
            district = district, 
            ward = ward, 
            bank_name = bank_name, 
            bank_number = bank_number, 
            bank_provine = bank_provine,
            bank_username = bank_username
        )

        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, 
                            email, 
                            customer_name, 
                            date_of_birth, 
                            phone_numner, 
                            address, 
                            province, 
                            district, 
                            ward, 
                            bank_name, 
                            bank_number, 
                            bank_provine, 
                            bank_username,
                            password = None):
        user = self.create_user(
            email = email,
            customer_name = customer_name,
            date_of_birth = date_of_birth,
            phone_numner = phone_numner,
            address = address,
            province = province,
            district = district, 
            ward = ward, 
            bank_name = bank_name, 
            bank_number = bank_number, 
            bank_provine = bank_provine,
            bank_username = bank_username,
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
    phone_numner = models.CharField(max_length = 20)
    address = models.CharField(max_length = 255, null = False)
    province = models.CharField(max_length = 255, null = True, blank = True)
    district = models.CharField(max_length = 255, null = True, blank = True)
    ward = models.CharField(max_length = 255, null = True, blank = True)
    bank_name = models.CharField(max_length = 255, null = True)
    bank_username = models.CharField(max_length = 255, null = True)
    bank_number = models.IntegerField()
    bank_provine = models.CharField(max_length = 255, null = False)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    avatar = models.ImageField(upload_to="product-image/", blank=True)
    
    objects = MyUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
                        'customer_name', 
                        'date_of_birth', 
                        'phone_numner', 
                        'address',
                        'province',
                        'district',
                        'ward',
                        'bank_name',
                        'bank_number',
                        'bank_provine',
                        'bank_username'
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
    
    
class ShipOptions(models.Model):
    name = models.CharField(max_length = 255, unique = True, blank = True)
    fee = models.IntegerField()
    
    def __str__(self):
        return str(self.name)    
    

class OrderStatus(models.Model):
    name = models.CharField(max_length = 255, unique = True, blank = True)
    
    def __str__(self):
        return str(self.name) 
    
    
class Driver(models.Model):
    name = models.CharField(max_length = 255, null = False, blank = True)
    phone_number = models.CharField(max_length = 12, null = False, blank = True)
    email = models.CharField(max_length = 100, blank = False)
    cmnd = models.CharField(max_length = 12, null = False)
    age = models.IntegerField(default = 18)
    driverLicense = models.CharField(max_length = 20, null = False, blank = False)
    username = models.CharField(max_length = 255, blank = False, null = False)
    password = models.CharField(max_length = 255, blank = False, null = False)
    avatar = models.ImageField(upload_to="product-image/", blank = True)
    
    def __str__(self):
        return str(self.name)
    

class Order(models.Model):
    account = models.ForeignKey(Customer, on_delete = models.CASCADE, related_name = 'account_order')
    customer_phonenumber = models.CharField(max_length = 15, null = False)
    customer_name = models.CharField(max_length = 255, null = False, blank = True)
    detail_address = models.CharField(max_length = 255, null = False, blank = True)
    province = models.CharField(max_length = 255)
    district = models.CharField(max_length = 255)
    ward = models.CharField(max_length = 255)
    ship_option = models.ForeignKey(ShipOptions, on_delete = models.SET_NULL, null = True)
    product_name = models.CharField(max_length = 255, blank = True)
    product_weight = models.DecimalField(max_digits = 8, decimal_places = 2)
    product_quantity = models.IntegerField()
    status = models.ForeignKey(OrderStatus, on_delete = models.CASCADE, related_name = 'order_status')
    cast = models.IntegerField()
    note = models.TextField()
    driver = models.ForeignKey(Driver, on_delete = models.SET_NULL, null = True, blank = True)
    isRecieved = models.BooleanField(default = False)
    isDone = models.BooleanField(default = False)
    product_image = models.ImageField(upload_to="product-image/", blank=True)
    
    def __str__(self):
        return str(self.customer_name)
    
    # @property
    # def imageURL(self):
    #     try:
    #         url = self.product_image.url
    #     except:
    #         url = ''
    #     return url
    

class InstanceAddress(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    latitude = models.CharField(max_length = 255, null = True, blank = True)
    longitude = models.CharField(max_length = 255, null = True, blank = True)
    
    def __str__(self):
        return str(self.id)
    
    
class RequestOption(models.Model):
    name = models.CharField(max_length = 255, blank = True)
    
    def __str__(self):
        return str(self.name)
    
    
class Request(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    request_option = models.ForeignKey(RequestOption, on_delete = models.SET_NULL, null = True)
    time = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.order.customer_name)
    
    
class StatusUpdate(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    status = models.ForeignKey(OrderStatus, on_delete = models.CASCADE)
    time = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['time']
    
    def __str__(self):
        return str(self.order.customer_name)
    
    
#Driver models
    
class LocationUpdate(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    city = models.CharField(max_length = 255, null = True, blank = True)
    province = models.CharField(max_length = 255, null = True, blank = True)
    ward = models.CharField(max_length = 255, null = True, blank = True)
    time = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return str(self.id)