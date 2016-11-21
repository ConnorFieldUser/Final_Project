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
    class Meta:
        model = Account
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ('items', 'user')

    def update(self, instance, validated_data):
        print(validated_data)
        # instance.items = validated_data.get('items', instance.items)
        items_data = validated_data.pop('items')
        cart = Cart.objects.create(**validated_data)
        for item_data in items_data:
            item = Item.objects.get(name=item_data["name"])
            cart_item = CartItem(cart=cart, item=item, quantity=1)
            cart_item.save()
        # instance.save()
        return instance

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        cart = Cart.objects.create(**validated_data)
        for item_data in items_data:
            item = Item.objects.get(name=item_data["name"])
            cart_item = CartItem(cart=cart, item=item, quantity=1)
            cart_item.save()
        return cart


class CartItemSerializer(serializers.ModelSerializer):

    cart_id = serializers.ReadOnlyField(source='cart.id')
    cart_user = serializers.StringRelatedField(source='cart.user')
    item_id = serializers.ReadOnlyField(source='item.id')
    item_name = serializers.ReadOnlyField(source='item.name')
    item_price = serializers.ReadOnlyField(source='item.price')

    class Meta:
        model = CartItem
        fields = ('cart_id', 'cart_user', 'item_id', 'item_name', 'item_price')


# class (notemodelserializer)
