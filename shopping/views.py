from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import TemplateView, ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse_lazy
from django.shortcuts import redirect


from django.views.generic.edit import FormView


from shopping.forms import SignUpForm

from shopping.models import Account, Cart, Item, CartItem
from shopping.mixins import DriverAccessMixin

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


class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class AccountDetailUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return Account.objects.get(user=self.request.user)


class CartListCreateAPIView(ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)


class CartItemListCreateAPIView(ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class CartItemDetailDestroyView(RetrieveDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class ItemListCreateAPIView(ListCreateAPIView):

    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CartLatestRemoveItemAPIView(APIView):

    serializer_class = CartSerializer

    def post(self, request, format=None):
        cart_item = request.data["id"]
        i1 = CartItem(id=cart_item)
        i1.delete()
        return Response("Deleted")


# class ItemDetailAPIView(RetrieveAPIView):
#     serializer_class = ItemSerializer
#     queryset = Item.objects.all()

class ItemDetailAPIView(RetrieveAPIView):
    serializer_class = ItemSerializer

    def get_object(self):
        ref_id = self.request.GET.get("ref_id")
        return Item.objects.get(ref_id=ref_id)


class CartLatestDetailUpdateAPIView(RetrieveUpdateAPIView):

    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated, )

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.posted = True
        return super().perform_update(serializer)

    def get_object(self):
        return Cart.objects.filter(user=self.request.user).latest('created_time')


class CartLatestAddItemAPIView(APIView):

    serializer_class = CartSerializer

    def post(self, request, format=None):
        cart = Cart.objects.filter(user=request.user).latest('created_time')
        quantity = request.data["quantity"]
        item_for_use = Item.objects.get(ref_id=request.data["ref_id"])
        item = item_for_use.id
        print(cart)
        i1 = CartItem(cart=cart, item_id=item, quantity=quantity)
        i1.save()

        return Response(request.data)


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
                    item = Item.objects.get(ref_id=e["ItemID"])
                except ObjectDoesNotExist:
                    item = False
                if not item:
                    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    item = Item.objects.create(name=e["Itemname"], category=e["ItemCategory"], description=e["ItemDescription"], image=e["ItemImage"], ref_id=e['ItemID'])
                    print('<<<Created>>>')
                else:
                    print('<<<Already Stored>>>')
                    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                e['price'] = item.price
            return Response(end)
        else:
            return Response("Nothing Found")


class UserCreateView(CreateView):
    model = User
    form_class = UserCreationForm
    success_url = reverse_lazy("login")


def login_success(request):

    if request.user.account.user_type == 'd':
        return redirect("account_list_view")
    else:
        return redirect("account_update_view")


class ThanksView(TemplateView):
    template_name = "thanks.html"


class AccountListView(DriverAccessMixin, ListView):
    model = Account


class AccountDetailView(DriverAccessMixin, DetailView):
    model = Account


class AccountUpdateView(UpdateView):
    model = Account
    fields = ('first_name', 'last_name', 'phone_number', 'adress', 'city', 'state', 'email', 'image', 'zipcode')

    def get_success_url(self):
        if not self.request.user.account.user_type == 'c':
            return reverse_lazy("account_detail_view", args=(self.object.id,))
        else:
            return reverse_lazy("email_template_view")

    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return Account.objects.get(user=self.request.user)


# class CartUpdateView(DriverAccessMixin, UpdateView):

#     model = Cart
#     fields = ('complete',)

#     def get_success_url(self):
#         return reverse_lazy("cart_detail_view", args=(self.object.id,))

#     permission_classes = (IsAuthenticated, )

#     def get_object(self):
#         return Cart.objects.filter(user=self.request.user).latest('created_time')


class CartUpdateView(DriverAccessMixin, UpdateView):
    model = Cart
    fields = ('complete', 'in_progress')
    success_url = reverse_lazy("cart_list_view")

    def form_valid(self, form):
        # form.save(user=self.request.user)
        # return super().perform_create(form)
        instance = form.save(commit=False)
        instance.driver = self.request.user
        return super().form_valid(form)

    # def get_success_url(self):
    #     return reverse_lazy('account_detail_view', args=(self.user.id,))


class EmailView(FormView):
    form_class = SignUpForm
    success_url = reverse_lazy("thanks_view")

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs

    def form_valid(self, form):
        form.send_email()
        return super().form_valid(form)


class EmailTemplateView(TemplateView):
    template_name = 'email_template.html'

    def get_context_data(self):
        context = super().get_context_data()
        context["form"] = SignUpForm(user=self.request.user)
        return context


class CartListView(DriverAccessMixin, ListView):
    model = Cart

    def get_queryset(self):
        return Cart.objects.filter(driver=self.request.user)
