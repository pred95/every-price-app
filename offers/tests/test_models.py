from django.test import TestCase
import datetime
from offers.models import Offer

# Create your tests here.


class OfferModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Offer.objects.create(product="Zucchine", shop="Coop",
                             city="Montecchio Emilia", region="Emilia Romagna", price=2.20)

    def test_product_label(self):
        offer = Offer.objects.get(id=1)
        field_label = offer._meta.get_field('product').verbose_name
        self.assertEqual(field_label, 'Name of the product')

    def test_product_max_length(self):
        offer = Offer.objects.get(id=1)
        max_length = offer._meta.get_field('product').max_length
        self.assertEqual(max_length, 100)

    def test_shop_label(self):
        offer = Offer.objects.get(id=1)
        field_label = offer._meta.get_field('shop').verbose_name
        self.assertEqual(field_label, 'Name of the shop')

    def test_shop_max_length(self):
        offer = Offer.objects.get(id=1)
        max_length = offer._meta.get_field('shop').max_length
        self.assertEqual(max_length, 100)

    def test_city_label(self):
        offer = Offer.objects.get(id=1)
        field_label = offer._meta.get_field('city').verbose_name
        self.assertEqual(field_label, 'City of the shop')

    def test_city_max_length(self):
        offer = Offer.objects.get(id=1)
        max_length = offer._meta.get_field('city').max_length
        self.assertEqual(max_length, 100)

    def test_region_label(self):
        offer = Offer.objects.get(id=1)
        field_label = offer._meta.get_field('region').verbose_name
        self.assertEqual(field_label, 'Region')

    def test_region_max_length(self):
        offer = Offer.objects.get(id=1)
        max_length = offer._meta.get_field('region').max_length
        self.assertEqual(max_length, 100)

    def test_price_label(self):
        offer = Offer.objects.get(id=1)
        field_label = offer._meta.get_field('price').verbose_name
        self.assertEqual(field_label, 'Price (€)')

    def test_price_max_digits(self):
        offer = Offer.objects.get(id=1)
        max_digits = offer._meta.get_field('price').max_digits
        self.assertEqual(max_digits, 6)

    def test_price_decimal_places(self):
        offer = Offer.objects.get(id=1)
        decimal_places = offer._meta.get_field('price').decimal_places
        self.assertEqual(decimal_places, 2)

    def test_object_name_is_product_comma_price_comma_at_shop_comma_city_comma_date(self):
        offer = Offer.objects.get(id=1)
        expected_object_name = f'{offer.product}, {offer.price}, @({offer.shop}, {offer.city}), {offer.date}'
        self.assertEqual(expected_object_name, str(offer))
