from django.db import models

from django.dispatch import receiver
from django.db.models.signals import post_save

from django.conf import settings
from rest_framework.authtoken.models import Token

import random

# Create your models here.


def random_price():
    return random.randint(3, 10)


USER_TYPE = [
    ('c', 'Customer'),
    ('d', 'Driver'),
]


class Account(models.Model):

    user = models.OneToOneField('auth.User')
    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    adress = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=25, null=True, blank=True)
    state = models.CharField(max_length=25, null=True, blank=True)
    zipcode = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=50, null=True, blank=True)
    user_type = models.CharField(max_length=1, choices=USER_TYPE)
    image = models.FileField(null=True, blank=True)

    def __str__(self):
        return str(self.user)

    @property
    def is_customer(self):
        return self.user_type == 'c'

    @property
    def is_driver(self):
        return self.user_type == 'd'

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return "http://www.finecooking.com/images/no_image_ld.jpg"

    @property
    def get_last_cart(self):
        try:
            # return self.user.cart_set.all().order_by('-created_time')[0]
            return self.user.carts.order_by('-created_time')[0]
        except IndexError:
            pass


@receiver(post_save, sender='auth.User')
def create_user_profile(**kwargs):
    created = kwargs.get('created')
    instance = kwargs.get('instance')
    if created:
        Account.objects.create(user=instance, user_type='c')


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Item(models.Model):
    name = models.CharField(max_length=999)
    category = models.CharField(max_length=45)
    description = models.CharField(max_length=999, null=True, blank=True)
    image = models.FileField(null=True, blank=True)
    ref_id = models.IntegerField()
    price = models.IntegerField(default=random_price)

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return "http://www.finecooking.com/images/no_image_ld.jpg"

    def __str__(self):
        return "{}".format(self.name)


class Cart(models.Model):
    user = models.ForeignKey('auth.User', related_name='carts')
    created_time = models.DateTimeField(auto_now_add=True)
    items = models.ManyToManyField(Item, through='CartItem')
    posted = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)
    in_progress = models.BooleanField(default=False)
    driver = models.ForeignKey('auth.User', related_name='driver_carts', null=True, blank=True)

    @property
    def total(self):
        total_price = 0
        for i in self.cartitem_set.all():
            total_price += i.item.price
        return total_price

    def __str__(self):
        return "{} {}".format(self.user, self.id)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart)
    item = models.ForeignKey(Item)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return "{}: {}".format(self.cart, self.item)
