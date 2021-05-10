from .test_setup import TestSetUp
from ..models import User
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# Create your tests here.


class TestRegisterViews(TestSetUp):
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_no_email(self):
        user_data = {
            'username': self.user_data['username'],
            'password': self.user_data['password']
        }
        res = self.client.post(self.register_url, user_data)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_no_username(self):
        user_data = {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        }
        res = self.client.post(self.register_url, user_data)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_no_password(self):
        user_data = {
            'username': self.user_data['username'],
            'email': self.user_data['email']
        }
        res = self.client.post(self.register_url, user_data)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_non_alphanumeric_username(self):
        user_data = {
            'username': 'non_alphanumeric_username@&%',
            'email': self.user_data['email'],
            'password': self.user_data['password']
        }
        res = self.client.post(self.register_url, user_data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(str(
            res.data['error'][0]), 'The username should only contain alphanumeric characters')

    def test_user_can_register_correctly(self):
        res = self.client.post(
            self.register_url, self.user_data, format='json')
        self.assertEqual(res.data['email'], self.user_data['email'])
        self.assertEqual(res.data['username'], self.user_data['username'])
        self.assertEqual(res.status_code, 201)


class TestLoginViews(TestSetUp):

    def test_user_cannot_login_with_unverified_email(self):
        self.client.post(self.register_url, self.user_data, format='json')
        res = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(res.status_code, 401)

    def test_user_cannot_login_with_non_active_account(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')

        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.is_active = False
        user.save()

        res = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(str(res.data['detail']),
                         'Account disabled, contact admin')

    def test_user_cannot_login_with_wrong_credential(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')

        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        res = self.client.post(self.login_url, {
                               'email': 'wrongEmail@gmail.com', 'password': 'wrongPassword'}, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(str(res.data['detail']),
                         'Invalid credentials, try again')

    def test_user_can_login_after_verification(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')

        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        res = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(res.status_code, 200)


class TestRequestPasswordResetViews(TestSetUp):

    def test_user_cannot_request_password_reset_without_registration(self):
        res = self.client.post(self.password_reset, {
                               'email': 'noexists@gmail.com'}, format='json')
        self.assertEqual(res.status_code, 400)
        self.assertEqual(
            res.data['error'], 'This account does not exist. Please register')

    def test_user_can_request_password_reset_correctly(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        res = self.client.post(self.password_reset, {
                               'email': self.user_data['email']}, format='json')
        self.assertEqual(res.status_code, 200)


class TestSetNewPasswordViews(TestSetUp):
    def test_user_cannot_reset_new_password_with_invalid_token(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))

        res = self.client.patch(self.set_new_password, {'password': self.fake.swift11(
        ), 'token': 'wrongtoken', 'uidb64': uidb64}, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(str(res.data['detail']),
                         'The reset link is not valid')

    def test_user_cannot_reset_new_password_with_invalid_uidb64(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()
        token = PasswordResetTokenGenerator().make_token(user)

        res = self.client.patch(self.set_new_password, {'password': self.fake.swift11(
        ), 'token': token, 'uidb64': 'wronguidb'}, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(str(res.data['detail']),
                         'The reset link is not valid')


class TestLogoutViews(TestSetUp):
    def test_user_cannot_logout_if_not_logged_in(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        res = self.client.post(
            self.logout_url, {'refresh': user.tokens()['refresh']}, format='json')
        self.assertEqual(res.status_code, 401)
        self.assertEqual(
            str(res.data['detail']), 'Authentication credentials were not provided.')

    def test_user_cannot_logout_with_invalid_refresh_token(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        response = self.client.post(
            self.login_url, self.user_data, format='json')
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + response.data['tokens']['access'])

        res = self.client.post(
            self.logout_url, {'refresh': 'invalidRefresh'}, format='json')

        self.assertEqual(res.status_code, 400)
        self.assertEqual(str(res.data[0]), 'Token is expired or invalid')

    def test_user_can_logout_correctly(self):
        response = self.client.post(
            self.register_url, self.user_data, format='json')
        email = response.data['email']
        user = User.objects.get(email=email)
        user.is_verified = True
        user.save()

        response = self.client.post(
            self.login_url, self.user_data, format='json')
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + response.data['tokens']['access'])

        res = self.client.post(self.logout_url, {
                               'refresh': response.data['tokens']['refresh']}, format='json')

        self.assertEqual(res.status_code, 204)
