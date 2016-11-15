from django.contrib import admin

from shopping.models import Account, Item, List

# Register your models here.

admin.site.register(Account)
admin.site.register(List)
admin.site.register(Item)
