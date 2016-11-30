from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from shopping.models import Account, Cart, Item, CartItem


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = User(**validated_data)
        # Hash the user's password.
        user.set_password(validated_data['password'])
        user.save()
        return user


class AccountSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    user_type = serializers.ReadOnlyField()

    def get_user(self, obj):
        return obj.user.id

    class Meta:
        model = Account
        fields = '__all__'
        # exclude = ['user', 'user_type']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField()

    def get_cart_items(self, obj):
        return obj.cartitem_set.all().values('id', 'item__name', 'item', 'quantity', 'item__price')

    class Meta:
        model = Cart
        fields = ('id', 'cart_items', 'posted', 'total')
