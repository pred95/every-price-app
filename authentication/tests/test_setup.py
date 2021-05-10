from rest_framework.test import APITestCase
from faker import Faker
from django.urls import reverse

# Create your tests here.


class TestSetUp(APITestCase):

    def setUp(self):
        self.register_url = reverse('auth:register')
        self.login_url = reverse('auth:login')
        self.password_reset = reverse('auth:request-reset-email')
        self.set_new_password = reverse('auth:password-reset-complete')
        self.logout_url = reverse('auth:logout')
        self.fake = Faker(['it_IT'])

        self.user_data = {
            'email': self.fake.email(),
            'username': self.fake.email().split('@')[0],
            'password': self.fake.email(),
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
