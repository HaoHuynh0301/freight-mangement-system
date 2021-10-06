from django.contrib import admin
from . import models
from . import driver_model

admin.site.register(models.Customer)
admin.site.register(models.Order)
admin.site.register(models.ShipOptions)
admin.site.register(models.OrderStatus)
admin.site.register(models.RequestOption)
admin.site.register(models.Request)
admin.site.register(models.StatusUpdate)
admin.site.register(models.InstanceAddress)
admin.site.register(driver_model.Driver)