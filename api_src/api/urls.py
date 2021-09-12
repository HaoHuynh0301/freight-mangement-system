from django.urls import path
from . import views

urlpatterns = [
    path('sign-in/', views.SignInView.as_view(), name = 'sign-in'),
    path('middleware/', views.MiddleWare.as_view(), name = 'middleware'),
    path('register/', views.RegisterView.as_view(), name = 'register'),
    
    # =============
    
    path('user-information/', views.UserInformationView.as_view(), name = 'user-information')
]
