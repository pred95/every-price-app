from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker
from ..models import Offer
from authentication.models import User

# Create your tests here.


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('auth:register')
        self.login_url = reverse('auth:login')
        self.offer_list_url = reverse('offers:offer-list')
        self.create_offer_url = reverse('offers:create-offer')
        self.my_offer_url = reverse('offers:my-offers')
        self.offer_detail_url = reverse(
            'offers:offer-detail', kwargs={'id': 1})
        self.delete_offer_url = reverse(
            'offers:delete-offer', kwargs={'id': 2})

        self.fake = Faker(['it_IT'])

        self.user_data_1 = {
            'email': self.fake.email(),
            'username': self.fake.email().split('@')[0],
            'password': self.fake.email(),
        }

        reg = self.client.post(
            self.register_url, self.user_data_1, format='json')
        email = reg.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        self.offer_data = {
            'product': 'Zucchine',
            'shop': 'Coop',
            'city': 'Montecchio Emilia',
            'region': 'Emilia Romagna',
            'price': 1.50,
        }

        for i in range(4):
            Offer.objects.create(
                product='Zucchine' + str(i),
                shop='Coop' + str(i),
                city='Montecchio Emilia',
                region='Emilia Romagna',
                price=1.50,
                user=user)

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
