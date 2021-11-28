from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from . import driver_view

urlpatterns = [
    path('sign-in/', views.SignInView.as_view(), name = 'sign-in'),
    path('middleware/', views.MiddleWare.as_view(), name = 'middleware'),
    path('register/', views.RegisterView.as_view(), name = 'register'),
    
    # ============= #
    
    path('user-information/', views.UserInformationView.as_view(), name = 'user-information'),
    path('order-detail/', views.OrderDetailView.as_view(), name = 'order-detail'),
    path('order-information/', views.OrderView.as_view(), name = 'order-information'),
    path('bank-information/', views.BankingInformation.as_view(), name = 'bank-information'),
    path('location-information/', views.LocationInformation.as_view(), name = 'location-information'),
    path('request/', views.RequestView.as_view(), name = 'request'),
    path('specific-order/', views.SpecificOrderView.as_view(), name = 'specific-orders'),
    path('status-update/', views.StatusUpdate.as_view(), name = 'status-update'),
    path('list-request/', views.ListRequestView.as_view(), name = 'list-request'),
    path('status-order/', views.StatusOrderView.as_view(), name = 'status-order'),
    
    # ============= #
    
    path('paidmoney/', views.PaidMoneyView.as_view(), name = 'paid-money'),
    path('total-order/', views.TotalOrderView.as_view(), name = 'total-orders'),
        
    # ============= #
    path('driver-view/', driver_view.DriverView.as_view(), name = 'driver'),
    path('driver-signin/', driver_view.SignInView.as_view(), name = 'driver-sign-in'),
    path('driver-middleware/', driver_view.MiddleWare.as_view(), name = 'middle-ware'),
    path('update-location/', driver_view.LocationUpdateView.as_view(), name = 'update-location'),
    path('order-drivers/', driver_view.OrderDriver.as_view(), name = 'order-driver'),
    path('available-order/', driver_view.InstanceOrdereView.as_view(), name = 'available-orders'),
    path('update-driver/', driver_view.UpdateDriverInformationView.as_view(), name = 'update-driver-information'),
    path('recieve-order/', driver_view.SetDriverOrderView.as_view(), name = 'recieve-order'),
    path('instance-order/', driver_view.InstanceOrderView.as_view(), name = 'instance-order'),
    path('set_paid_order/', driver_view.UpdatePaidOrder.as_view(), name = 'update_paid'),
    path('cus-instance-address/', views.CustomerInstanceAddressView.as_view(), name = 'customer-instance-address'),
    path('driver-address/', views.InstanceAddressCustomerView.as_view(), name = 'driver-address')

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
