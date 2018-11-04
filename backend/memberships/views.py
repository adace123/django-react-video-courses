from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import routers
from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout
from .serializers import MembershipSerializer, SubscriptionSerializer, UserMembershipSerializer
from .models import Membership, Subscription, UserMembership

# Create your views here.
class MembershipViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()

    def get_object(self):
        return Membership.objects.get(membership_type=self.kwargs['pk'].upper())

class SubscriptionViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()

class UserMembershipViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = UserMembershipSerializer
    queryset = UserMembership.objects.all()

class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
        if not user:
            return Response(data={'message': 'Invalid credentials'}, status=HTTP_401_UNAUTHORIZED)
        
        request.user = user
        token, _ = Token.objects.get_or_create(user=user)

        return Response(data={'token': token.key, 'message': 'Successfully logged in'}, status=HTTP_200_OK)

class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        user = User.objects.filter(username=request.data.get('username'), email=request.data.get('email')).first()
        if user:
            return Response(data={'message': 'User already exists'}, status=HTTP_400_BAD_REQUEST)
        
        auth = {'username': request.data.get('username'), 'password': request.data.get('password'), 'email': request.data.get('email')}
        user = User.objects.create(**auth)
        token = Token.objects.create(user=user)
        return Response(data={'message': 'Successfully registered', 'token': token.key}, status=HTTP_200_OK)

class LogoutView(APIView):

    def post(self, request):
        user_token = Token.objects.filter(key=request.auth).first()
        user_token.delete()
        return Response(data={'message': 'Successfully logged out', 'token': None}, status=HTTP_200_OK)

