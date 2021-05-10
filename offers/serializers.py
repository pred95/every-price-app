from rest_framework import serializers
from .models import Offer


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'product', 'shop', 'city',
                  'region', 'price', 'date', 'image', 'user']
