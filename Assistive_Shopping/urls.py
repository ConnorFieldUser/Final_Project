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


from shopping.views import UserCreateView, IndexView, UserCreateAPIView, AccountDetailUpdateAPIView, CartListCreateAPIView
# AccountDetailUpdateAPIView,
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('^', include('django.contrib.auth.urls')),
    url(r'^$', IndexView.as_view(), name="index_view"),
    url(r'^create_user/$', UserCreateView.as_view(), name="user_create_view"),
    url(r'^api/obtain_token/', views.obtain_auth_token, name="obtain_auth_token"),
    url(r'^api/user/create/$', UserCreateAPIView.as_view(), name="user_create_api_view"),
    # url(r'^api/account/(?P<pk>\d+)/$', AccountDetailUpdateAPIView.as_view(), name="account_detail_update_api_view"),
    url(r'^api/account/profile/$', AccountDetailUpdateAPIView.as_view(), name="account_detail_update_api_view"),
    url(r'^api/carts/$', CartListCreateAPIView.as_view(), name="cart_list_create_api_view")
]
