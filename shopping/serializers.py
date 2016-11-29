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
        fields = ('id', 'cart_items')

    # def update(self, instance, validated_data):
    #     print(validated_data)
    #     # instance.items = validated_data.get('items', instance.items)
    #     items_data = validated_data.pop('items')
    #     cart = Cart.objects.create(**validated_data)
    #     for item_data in items_data:
    #         item = Item.objects.get(name=item_data["name"])
    #         cart_item = CartItem(cart=cart, item=item, quantity=1)
    #         cart_item.save()
    #     # instance.save()
    #     return instance
    #
    # def create(self, validated_data):
    #     items_data = validated_data.pop('items')
    #     cart = Cart.objects.create(**validated_data)
    #     for item_data in items_data:
    #         item = Item.objects.get(name=item_data["name"])
    #         cart_item = CartItem(cart=cart, item=item, quantity=1)
    #         cart_item.save()
    #     return cart


# class (notemodelserializer)
