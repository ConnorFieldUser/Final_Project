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


from shopping.views import UserCreateView, IndexView, UserCreateAPIView, AccountDetailUpdateAPIView, CartListCreateAPIView, ItemListCreateAPIView, CartItemListCreateAPIView, CartItemDetailDestroyView, ApiTestView, AccountListView, AccountDetailView, AccountUpdateView, DriverView, CartUpdateView, CartDetailView, CartLatestDetailViewAPIView

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
    url(r'^api/carts/latest/$', CartLatestDetailViewAPIView.as_view(), name="cart_latest_detail_update_api_view"),
    url(r'^api/cartitems/$', CartItemListCreateAPIView.as_view(), name="cartitem_list_api_view"),
    url(r'^api/cartitems/(?P<pk>\d+)/$', CartItemDetailDestroyView.as_view(), name="cartitem_detail_destroy_view"),
    url(r'^api/items/$', ItemListCreateAPIView.as_view(), name="item_list_create_api_view"),
    url(r'^api/test/$', ApiTestView.as_view(), name="item_view"),
    url(r'^accounts/$', AccountListView.as_view(), name="account_list_view"),
    url(r'^accounts/(?P<pk>\d+)/$', AccountDetailView.as_view(), name="account_detail_view"),
    url(r'^accounts/update/$', AccountUpdateView.as_view(), name="account_update_view"),
    url(r'^driver/$', DriverView.as_view(), name="driver_view"),
    url(r'^carts/(?P<pk>\d+)/update$', CartUpdateView.as_view(), name="cart_update_view"),
    url(r'^carts/(?P<pk>\d+)/$', CartDetailView.as_view(), name="cart_detail_view"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
