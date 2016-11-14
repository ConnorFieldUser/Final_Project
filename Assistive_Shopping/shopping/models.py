from django.db import models

from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.


class Account(models.Model):

    user = models.OneToOneField('auth.User')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender='auth.User')
def create_user_profile(**kwargs):
    created = kwargs.get('created')
    instance = kwargs.get('instance')
    if created:
        Account.objects.create(user=instance)


# class ContactCard(models.Model):
    # first_name = models.CharField(max_length=20)
    # last_name = models.CharField(max_length=20)
    # phone_number = models.IntegerField()
    # adress = (models.TextField)
