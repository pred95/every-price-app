from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView
from .serializers import *
from .models import Offer
from rest_framework import permissions
from .permissions import HasPosted
from .renderers import OfferRenderer
from rest_framework.response import Response


# Create your views here.
class OfferListAPIView(ListAPIView):
    serializer_class = OfferSerializer
    renderer_classes = (OfferRenderer, )

    def list(self, request):
        queryset = Offer.objects.all()
        serializer = self.serializer_class(data=queryset, many=True)
        serializer.is_valid()
        return Response(serializer.data)


class CreateOfferAPIView(CreateAPIView):
    serializer_class = OfferSerializer
    renderer_classes = (OfferRenderer, )
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class OfferDetailAPIView(RetrieveAPIView):
    serializer_class = OfferSerializer
    renderer_classes = (OfferRenderer, )

    queryset = Offer.objects.all()
    lookup_field = 'id'


class DeleteOfferAPIView(DestroyAPIView):
    serializer_class = OfferSerializer
    renderer_classes = (OfferRenderer, )

    queryset = Offer.objects.all()
    permission_classes = (permissions.IsAuthenticated, HasPosted)
    lookup_field = 'id'
