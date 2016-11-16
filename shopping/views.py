from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView

from shopping.models import Account, Cart
from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView
from shopping.serializers import UserSerializer, AccountSerializer, CartSerializer

from rest_framework.permissions import IsAuthenticated


# Create your views here.


class IndexView(TemplateView):
    template_name = 'index.html'


class UserCreateView(CreateView):
    model = User
    form_class = UserCreationForm
    success_url = "/"


class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AccountDetailUpdateAPIView(RetrieveUpdateAPIView):
    # queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return Account.objects.get(user=self.request.user)

    def get_queryset(self):
        return Account.objects.filter(user=self.request.user)


class CartListCreateAPIView(ListCreateAPIView):
    # queryset = List.objects.all()
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.get(user=self.request.user)
