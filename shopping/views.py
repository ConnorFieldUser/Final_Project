from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import TemplateView, ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse_lazy

from django.views.generic.edit import FormView

from shopping.forms import SignUpForm

from shopping.models import Account, Cart, Item, CartItem

from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from shopping.serializers import UserSerializer, AccountSerializer, CartSerializer, ItemSerializer, CartItemSerializer
from rest_framework.permissions import IsAuthenticated


import requests
from xmljson import parker as bf
from json import dumps
from xml.etree.ElementTree import fromstring


from io import StringIO
import json

import os
api_key = os.environ.get('api_key')

# Create your views here.

print("ASSISTIVE SHOPPING")


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

    # def get_queryset(self):
    #     return Account.objects.filter(user=self.request.user)


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


# view for api call
class SupermarketAPIView(APIView):

    def post(self, request):
        search_text = request.POST.get("search_text")
        r = requests.get("http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY={}&ItemName={}".format(api_key, search_text))
        xml_result = r.text
        xml_to_json = dumps(bf.data(fromstring(xml_result)))
        json_data = xml_to_json.replace('{http://www.SupermarketAPI.com}', '')
        io = StringIO(json_data)
        end = json.load(io)
        if end:
            for e in end["Product"]:
                try:
                    item_does_exist = Item.objects.get(ref_id=e["ItemID"])
                except ObjectDoesNotExist:
                    item_does_exist = False
                if not item_does_exist:
                    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    Item.objects.create(name=e["Itemname"], category=e["ItemCategory"], description=e["ItemDescription"], image=e["ItemImage"], ref_id=e['ItemID'])
                    print('<<<Created>>>')
                else:
                    print('<<<Already Stored>>>')
                    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            return Response(end)
        else:
            return Response("Nothing Found")
    # template_name = 'test.html'

    # def post(self, request):
    #     search_text = request.POST.get("search_text")
    #     return search_text

    # def post(self, request):
    #     search_text = request.POST.get("search_text")
    #     r = requests.get("http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY={}&ItemName={}".format(api_key, search_text))
    #     print(search_text)
    #     xml_result = r.text
    #     xml_to_json = dumps(bf.data(fromstring(xml_result)))
    #     json_data = xml_to_json.replace('{http://www.SupermarketAPI.com}', '')
        # io = StringIO(json_data)
        # return Response(json.load(io))

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


class CartUpdateView(UpdateView):

    model = Cart
    fields = ('complete',)

    def get_success_url(self):
        return reverse_lazy("cart_detail_view", args=(self.object.id,))

    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return Cart.objects.filter(user=self.request.user).latest('created_time')


class CartDetailView(DetailView):
    model = Cart


class CartLatestDetailUpdateViewAPIView(RetrieveUpdateAPIView):

    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated, )

    def perform_update(self, serializer):
        pass

    def get_object(self):
        return Cart.objects.filter(user=self.request.user).latest('created_time')


# class CartLatestAddItemAPIView(APIView):
#
#     serializer_class = CartSerializer
#
#     def post(self, request, format=None):
#         # cart = Cart.objects.get(user=request.POST['user']).latest('created_time')
#         cart = Cart.objects.filter(user=request.user).latest('created_time')
#         item = request.data["id"]
#         quantity = request.data["quantity"]
#         print(item)
#         print(cart)
#         i1 = CartItem(cart=cart, item_id=item, quantity=quantity)
#         # i1 = CartItem()
#         i1.save()
#         return Response(request.data)


class CartLatestRemoveItemAPIView(APIView):

    serializer_class = CartSerializer

    def post(self, request, format=None):
        # cart = Cart.objects.filter(user=request.user).latest('created_time')
        print('test')
        # print(request.data)
        cart_item = request.data["id"]
        # print(cart_item)
        # cart_item = request.data
        print(cart_item)
        # print(cart)
        i1 = CartItem(id=cart_item)
        i1.delete()
        # return Response(request.data)
        return Response("Deleted")


class EmailView(FormView):
    form_class = SignUpForm
    success_url = reverse_lazy("account_list_view")

    def form_valid(self, form):
        form.send_email()
        return super().form_valid(form)


class EmailTemplateView(TemplateView):
    template_name = 'email_template.html'

    def get_context_data(self):
        context = super().get_context_data()
        context["form"] = SignUpForm()
        return context


# class TestAPIView(APIView):
#
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer

    # def post(self, request):
    #     search_text = request.POST.get("search_text")
    #     r = requests.get("http://www.supermarketapi.com/api.asmx/SearchByProductName?APIKEY={}&ItemName={}".format(api_key, search_text))
    #     xml_result = r.text
    #     xml_to_json = dumps(bf.data(fromstring(xml_result)))
    #     json_data = xml_to_json.replace('{http://www.SupermarketAPI.com}', '')
    #     io = StringIO(json_data)
    #     end = json.load(io)
    #     if end:
    #         for e in end["Product"]:
    #             # e["ItemID"]
    #             try:
    #                 item_does_exist = Item.objects.get(ref_id=e["ItemID"])
    #             except ObjectDoesNotExist:
    #                 item_does_exist = False
    #             if not item_does_exist:
    #                 print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    #                 # print(e["Itemname"])
    #                 # print(e["ItemCategory"])
    #                 # print(e["ItemDescription"])
    #                 # print(e["ItemImage"])
    #                 Item.objects.create(name=e["Itemname"], category=e["ItemCategory"], description=e["ItemDescription"], image=e["ItemImage"], ref_id=e['ItemID'])
    #                 print('<<<Created>>>')
    #             else:
    #                 print('<<<Already Stored>>>')
    #                 print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    #         return Response(end)
    #     else:
    #         return Response("Nothing Found")


class ItemDetailAPIView(RetrieveAPIView):
    serializer_class = ItemSerializer
    # permission_classes = (IsAuthenticated, )
    queryset = Item.objects.all()

    # def get_object(self):
    #     return Item.objects.get(user=self.request.user)


class CartLatestAddItemAPIView(APIView):

    serializer_class = CartSerializer

    def post(self, request, format=None):
        # cart = Cart.objects.get(user=request.POST['user']).latest('created_time')
        cart = Cart.objects.filter(user=request.user).latest('created_time')
        # item = request.data["id"]
        quantity = request.data["quantity"]
        item_for_use = Item.objects.get(ref_id=request.data["ref_id"])
        # print(item)
        item = item_for_use.id
        print(cart)
        i1 = CartItem(cart=cart, item_id=item, quantity=quantity)
        i1.save()

        return Response(request.data)
