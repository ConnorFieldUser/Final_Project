from django.db import models

from django.dispatch import receiver
from django.db.models.signals import post_save

from django.conf import settings
from rest_framework.authtoken.models import Token


# Create your models here.


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
    name = models.CharField(max_length=25)

    def __str__(self):
        return "{}".format(self.name)


class Cart(models.Model):
    user = models.ForeignKey('auth.User')
    created_time = models.DateTimeField(auto_now_add=True)
    items = models.ManyToManyField(Item, through='CartItem')
    complete = models.BooleanField(default=True)

    def __str__(self):
        return "{} {}".format(self.user, self.id)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart)
    item = models.ForeignKey(Item)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return "{}: {}".format(self.cart, self.item)
