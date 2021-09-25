from django.urls import path
from . import views

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
    
    # ============= #
    
    path('paidmoney/', views.PaidMoneyView.as_view(), name = 'paid-money'),
    path('total-order/', views.TotalOrderView.as_view(), name = 'total-orders')
]
