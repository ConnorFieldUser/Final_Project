from django.contrib import admin

from shopping.models import Account, Item, Cart, CartItem

# Register your models here.

admin.site.register(Account)
admin.site.register(Item)
admin.site.register(CartItem)


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1


class CartAdmin(admin.ModelAdmin):
    inlines = (CartItemInline,)


admin.site.register(Cart, CartAdmin)
