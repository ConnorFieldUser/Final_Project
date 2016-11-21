from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import TemplateView, ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView


from shopping.models import Account, Cart, Item, CartItem
from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from shopping.serializers import UserSerializer, AccountSerializer, CartSerializer, ItemSerializer, CartItemSerializer

from rest_framework.permissions import IsAuthenticated

import requests
from xmljson import parker as bf
from json import dumps
from xml.etree.ElementTree import fromstring

from django.urls import reverse_lazy

from io import StringIO
import json

import os
api_key = os.environ.get('api_key')

# Create your views here.


class IndexView(TemplateView):
    template_name = 'index.html'


class UserCreateView(CreateView):
    model = User
    form_class = UserCreationForm
    success_url = reverse_lazy("account_list_view")


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
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    # def get_queryset(self):
    #     return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    # def get_queryset(self):
    #     return Cart.objects.filter(user=self.request.user)


class CartItemListCreateAPIView(ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class CartItemDetailDestroyView(RetrieveDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class ItemListCreateAPIView(ListCreateAPIView):

    queryset = Item.objects.all()
    serializer_class = ItemSerializer


def get_response():
    r = requests.get("http://swapi.co/api/starships/9/")
    ships = r.json()
    results_list = ships['name']
    return results_list


# view for api call
class ApiTestView(APIView):
    # template_name = 'test.html'

    def get(self, request):
        r = requests.get("http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY={}&ItemName=Parsley".format(api_key))
        xml_result = r.text
        xml_to_json = dumps(bf.data(fromstring(xml_result)))
        json_data = xml_to_json.replace('{http://www.SupermarketAPI.com}', '')
        # ships_list = {'ships': json_data['name']}
        # print(ships_list)
        print(type(json_data))
        io = StringIO(json_data)
        return Response(json.load(io))

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     r = requests.get("http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY={}&ItemName=Parsley".format(api_key))
    #     xml_result = requests.get(r).text
    #     xml_to_json = dumps(bf.data(fromstring(xml_result)))
    #     json_data = xml_to_json.replace('{http://www.SupermarketAPI.com}', '')
    #     context = json_data
    #     # context['testing'] = self.request.user
    #     return context


class AccountListView(ListView):
    model = Account


class AccountDetailView(DetailView):
    model = Account


class AccountUpdateView(UpdateView):
    model = Account
    fields = ('first_name', 'last_name', 'phone_number', 'adress', 'city', 'state', 'email', 'image')

    def get_success_url(self):
        return reverse_lazy("account_detail_view", args=(self.object.id,))

    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return Account.objects.get(user=self.request.user)


class DriverView(TemplateView):
    template_name = "driver.html"


# class DriverView(FormView):
#     form_class = EmailForm
#     success_url = reverse_lazy("account_list_view")
#
#     def form_valid(self, form):
#         form.send_email()
#         return super().form_valid(form)
