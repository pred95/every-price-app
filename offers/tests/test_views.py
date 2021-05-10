from .test_setup import TestSetUp
from ..models import Offer
from authentication.models import User


class TestOfferListView(TestSetUp):
    def test_user_can_get_the_offer_list(self):
        res = self.client.get(self.offer_list_url, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 4)


class TestCreateNewOffer(TestSetUp):
    def test_user_cannot_create_a_new_offer_if_not_logged_in(self):
        res = self.client.post(self.create_offer_url,
                               self.offer_data, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(
            str(res.data['detail']), 'Authentication credentials were not provided.')

    def test_user_can_create_a_new_offer_if_logged_if(self):
        login = self.client.post(
            self.login_url, self.user_data_1, format='json')
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + login.data['tokens']['access'])

        res = self.client.post(self.create_offer_url,
                               self.offer_data, format='json')
        self.assertEqual(res.status_code, 201)


class TestOfferDetailView(TestSetUp):
    def test_user_can_get_offer_detail(self):
        res = self.client.get(self.offer_detail_url, format='json')
        self.assertEqual(res.status_code, 200)


class TestDeleteOfferView(TestSetUp):
    def test_user_cannot_delete_an_offer_if_not_logged_in(self):
        res = self.client.delete(self.delete_offer_url, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(
            str(res.data['detail']), 'Authentication credentials were not provided.')

    def test_user_cannot_delete_an_offer_of_another_user(self):
        user_data_2 = {
            'email': self.fake.email(),
            'username': self.fake.email().split('@')[0],
            'password': self.fake.email(),
        }
        reg = self.client.post(self.register_url, user_data_2, format='json')
        email = reg.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        login = self.client.post(self.login_url, user_data_2, format='json')
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + login.data['tokens']['access'])

        res = self.client.delete(self.delete_offer_url, format='json')

        self.assertEqual(res.status_code, 403)
        self.assertEqual(
            str(res.data['detail']), 'You do not have permission to perform this action.')

    def test_user_can_delete_an_offer_correctly(self):
        login = self.client.post(
            self.login_url, self.user_data_1, format='json')
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + login.data['tokens']['access'])

        res = self.client.delete(self.delete_offer_url, format='json')

        self.assertEqual(res.status_code, 204)
