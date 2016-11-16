from django.db import models

from django.dispatch import receiver
from django.db.models.signals import post_save

from django.conf import settings
from rest_framework.authtoken.models import Token


# Create your models here.


class Account(models.Model):

    user = models.OneToOneField('auth.User')
    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.IntegerField(null=True, blank=True)
    adress = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=25, null=True, blank=True)
    state = models.CharField(max_length=25, null=True, blank=True)
    email = models.EmailField(max_length=50, null=True, blank=True)

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender='auth.User')
def create_user_profile(**kwargs):
    created = kwargs.get('created')
    instance = kwargs.get('instance')
    if created:
        Account.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Cart(models.Model):
    user = models.ForeignKey('auth.User')
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} {}".format(self.user, self.id)


class Item(models.Model):
    name = models.CharField(max_length=25)
    price = models.FloatField()

    def __str__(self):
        return "{}, ${}0".format(self.name, self.price)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart)
    item = models.ForeignKey(Item)

    def __str__(self):
        return "{}: {}".format(self.cart, self.item)


# class ContactCard(models.Model):
#     first_name = models.CharField(max_length=20, null=True, blank=True)
#     last_name = models.CharField(max_length=20, null=True, blank=True)
#     phone_number = models.IntegerField(null=True, blank=True)
#     adress = models.TextField(null=True, blank=True)
#
#
# @receiver(post_save, sender='auth.User')
# def create_user_contact(**kwargs):
#     created = kwargs.get('created')
#     instance = kwargs.get('instance')
#     if created:
#         ContactCard.objects.create(user=instance)
