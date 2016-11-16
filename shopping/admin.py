from django.contrib import admin

from shopping.models import Account, Item, Cart, CartItem

# Register your models here.

admin.site.register(Account)
admin.site.register(Cart)
admin.site.register(Item)
admin.site.register(CartItem)
