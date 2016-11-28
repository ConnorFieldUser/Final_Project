"""Assistive_Shopping URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken import views


from shopping.views import UserCreateView, IndexView, UserCreateAPIView, AccountDetailUpdateAPIView, CartListCreateAPIView, ItemListCreateAPIView, CartItemListCreateAPIView, CartItemDetailDestroyView, SupermarketAPIView, AccountListView, AccountDetailView, AccountUpdateView, DriverView, CartUpdateView, CartDetailView, CartLatestDetailUpdateViewAPIView, CartLatestAddItemAPIView, CartLatestRemoveItemAPIView, EmailView, EmailTemplateView, ItemDetailAPIView, CartLatestAddItemRefIdAPIView
# TestAPIView,
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('^', include('django.contrib.auth.urls')),
    url(r'^$', IndexView.as_view(), name="index_view"),
    url(r'^create_user/$', UserCreateView.as_view(), name="user_create_view"),
    url(r'^api/obtain_token/', views.obtain_auth_token, name="obtain_auth_token"),
    url(r'^api/user/create/$', UserCreateAPIView.as_view(), name="user_create_api_view"),
    url(r'^api/account/profile/$', AccountDetailUpdateAPIView.as_view(), name="account_detail_update_api_view"),
    url(r'^api/carts/$', CartListCreateAPIView.as_view(), name="cart_list_create_api_view"),
    url(r'^api/carts/latest/$', CartLatestDetailUpdateViewAPIView.as_view(), name="cart_latest_detail_update_api_view"),
    url(r'^api/carts/latest/add_item/$', CartLatestAddItemAPIView.as_view(), name="cart_latest_add_item_api_view"),
    url(r'^api/carts/latest/add_item/ref_id/$', CartLatestAddItemRefIdAPIView.as_view(), name="test_ref_id"),
    url(r'^api/carts/latest/remove_item/$', CartLatestRemoveItemAPIView.as_view(), name="cart_latest_remove_item_api_view"),
    url(r'^api/cartitems/$', CartItemListCreateAPIView.as_view(), name="cartitem_list_api_view"),
    url(r'^api/cartitems/(?P<pk>\d+)/$', CartItemDetailDestroyView.as_view(), name="cartitem_detail_destroy_view"),
    url(r'^api/items/$', ItemListCreateAPIView.as_view(), name="item_list_create_api_view"),
    url(r'^api/supermarket/$', SupermarketAPIView.as_view(), name="supermarket_api_view"),
    # url(r'^api/test/$', TestAPIView.as_view(), name="test_api_view"),
    url(r'^accounts/$', AccountListView.as_view(), name="account_list_view"),
    url(r'^accounts/(?P<pk>\d+)/$', AccountDetailView.as_view(), name="account_detail_view"),
    url(r'^accounts/update/$', AccountUpdateView.as_view(), name="account_update_view"),
    url(r'^driver/$', DriverView.as_view(), name="driver_view"),
    url(r'^carts/update$', CartUpdateView.as_view(), name="cart_update_view"),
    url(r'^carts/(?P<pk>\d+)/$', CartDetailView.as_view(), name="cart_detail_view"),
    url(r'^send_email/$', EmailView.as_view(), name="email_view"),
    url(r'^email/$', EmailTemplateView.as_view(), name="email_template_view"),
    url(r'^api/items/(?P<pk>\d+)/$', ItemDetailAPIView.as_view(), name="item_detail_api_view")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
