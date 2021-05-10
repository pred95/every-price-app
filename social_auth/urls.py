from django.urls import path
from .views import *

app_name = 'social-auth'

urlpatterns = [
    path('google/', GoogleSocialAuthView.as_view(), name='google'),
]
