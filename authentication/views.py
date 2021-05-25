from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from .serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .renderers import UserRenderer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os
import socket


class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = ['everyprice', 'http', 'https']

# Create your views here.


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    #renderer_classes = (UserRenderer, )

    def post(self, request):
        request.data['email'] = request.data['email'].lower()
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])

        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(request).domain
        relativeLink = reverse('auth:email-verify')
        absUrl = 'http://' + current_site + \
            relativeLink + "?token=" + str(token)

        email_body = 'Hi ' + user.username + \
            '\n Use link below to verify your email: \n' + absUrl

        data = {
            'email_body': email_body,
            'email_subject': 'Verify your email',
            'to_email': user.email
        }

        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    redirect_url = 'http://' + \
        socket.gethostbyname(socket.gethostname()) + "/email-activated/"

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Enter token', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(
                token, key=os.environ.get('SECRET_KEY'), algorithms=['HS256'])

            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()

            return CustomRedirect(self.redirect_url + '?message=Successfully activated')

        except jwt.ExpiredSignatureError:
            return CustomRedirect(self.redirect_url + '?message=Activation link expired')
        except jwt.exceptions.DecodeError:
            return CustomRedirect(self.redirect_url + '?message=Invalid token')


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CurrentUserAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        data = {
            'id': request.user.id,
            'email': request.user.email,
            'username': request.user.username
        }

        return Response(data, status=status.HTTP_200_OK)


class GetUserAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    queryset = User.objects.all()
    lookup_field = 'id'


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = RequestPasswordResetEmailSerializer

    def post(self, request):
        data = {
            'request': request,
            'data': request.data
        }
        serializer = self.serializer_class(data=data)

        email = request.data['email']

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            current_site = get_current_site(request=request).domain
            relativeLink = reverse(
                'auth:password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            redirect_url = 'http://' + \
                socket.gethostbyname(socket.gethostname()) + '/reset-password/'
            absUrl = 'http://' + current_site + relativeLink

            email_body = 'Hi!\n Use link below to reset your password:\n' + \
                absUrl + "?redirect_url=" + redirect_url

            data = {
                'email_body': email_body,
                'email_subject': 'Reset your password',
                'to_email': user.email
            }

            Util.send_email(data)

            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        return Response({'error': 'This account does not exist. Please register'}, status=status.HTTP_400_BAD_REQUEST)


class PasswordTokenCheckAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        redirect_url = 'http://' + \
            socket.gethostbyname(socket.gethostname()) + '/reset-password/'

        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            # check if user has already used this link
            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url + '?token_valid=False')
                else:
                    return CustomRedirect('http://' + socket.gethostbyname(socket.gethostname()) + '?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url + '?token_valid=True&?message=Credential valid&?uidb64=' + uidb64 + '&?token=' + token)
            else:
                return CustomRedirect('http://' + socket.gethostbyname(socket.gethostname()) + '?token_valid=False')

        except DjangoUnicodeDecodeError:
            if not PasswordResetTokenGenerator().check_token(user, token):
                return CustomRedirect(redirect_url + '?token_valid=False')


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
