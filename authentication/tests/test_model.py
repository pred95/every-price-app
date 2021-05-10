from django.test import TestCase
from ..models import User
from faker import Faker

# Create your tests here.


class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        fake = Faker()
        User.objects.create(email=fake.email(), username=fake.email().split(
            '@')[0], password=fake.email())

    def test_username_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('username').verbose_name
        self.assertEqual(field_label, 'username')

    def test_username_max_length(self):
        user = User.objects.get(id=1)
        max_length = user._meta.get_field('username').max_length
        self.assertEqual(max_length, 255)

    def test_email_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('email').verbose_name
        self.assertEqual(field_label, 'email')

    def test_email_max_length(self):
        user = User.objects.get(id=1)
        max_length = user._meta.get_field('email').max_length
        self.assertEqual(max_length, 255)

    def test_first_name_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('first_name').verbose_name
        self.assertEqual(field_label, 'first name')

    def test_first_name_max_length(self):
        user = User.objects.get(id=1)
        max_length = user._meta.get_field('first_name').max_length
        self.assertEqual(max_length, 255)

    def test_last_name_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('last_name').verbose_name
        self.assertEqual(field_label, 'last name')

    def test_last_name_max_length(self):
        user = User.objects.get(id=1)
        max_length = user._meta.get_field('last_name').max_length
        self.assertEqual(max_length, 255)

    def test_is_verified_default_false(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.is_verified, False)

    def test_is_active_default_true(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.is_active, True)

    def test_is_staff_default_false(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.is_staff, False)

    def test_is_auth_provider_default_email(self):
        user = User.objects.get(id=1)
        self.assertEqual(user.auth_provider, 'email')

    def test_object_name_is_email(self):
        user = User.objects.get(id=1)
        expected_object_name = str(user.email)
        self.assertEqual(expected_object_name, str(user))

    def test_create_user_with_no_email(self):
        fake = Faker()
        res = User.objects.create(
            username=fake.email().split('@')[0], password=fake.email())
