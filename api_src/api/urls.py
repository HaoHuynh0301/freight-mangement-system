from django.urls import path
from . import views
from . import driver_view

urlpatterns = [
    path('sign-in/', views.SignInView.as_view(), name = 'sign-in'),
    path('middleware/', views.MiddleWare.as_view(), name = 'middleware'),
    path('register/', views.RegisterView.as_view(), name = 'register'),
    
    # ============= #
    
    path('user-information/', views.UserInformationView.as_view(), name = 'user-information'),
    path('order-information/', views.OrderView.as_view(), name = 'order-information'),
    path('bank-information/', views.BankingInformation.as_view(), name = 'bank-information'),
    path('location-information/', views.LocationInformation.as_view(), name = 'location-information'),
    path('request/', views.RequestView.as_view(), name = 'request'),
    path('specific-order/', views.SpecificOrderView.as_view(), name = 'specific-orders'),
    path('status-update/', views.StatusUpdate.as_view(), name = 'status-update'),
    path('list-request/', views.ListRequestView.as_view(), name = 'list-request'),
    path('instance-address/', views.InstanceAddressView.as_view(), name = 'instance-address'),
    
    # ============= #
    
    path('paidmoney/', views.PaidMoneyView.as_view(), name = 'paid-money'),
    path('total-order/', views.TotalOrderView.as_view(), name = 'total-orders'),
        
    # ============= #
    
    path('driver-view/', driver_view.DriverView.as_view(), name = 'driver'),
    path('driver-signin/', driver_view.SignInView.as_view(), name = 'driver-sign-in'),
    path('driver-middleware/', driver_view.MiddleWare.as_view(), name = 'middle-ware'),
]
