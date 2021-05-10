from django.urls import path
from .views import *

app_name = 'offers'

urlpatterns = [
    path('', OfferListAPIView.as_view(), name='offer-list'),
    path('create/', CreateOfferAPIView.as_view(), name='create-offer'),
    path('<int:id>/', OfferDetailAPIView.as_view(), name='offer-detail'),
    path('delete/<int:id>', DeleteOfferAPIView.as_view(), name='delete-offer'),
]
