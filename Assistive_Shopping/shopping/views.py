from django.shortcuts import render

from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm

from django.views.generic import TemplateView

from django.views.generic.edit import CreateView


# Create your views here.

class IndexView(TemplateView):
        template_name = 'index.html'


class UserCreateView(CreateView):
    model = User
    form_class = UserCreationForm
    success_url = "/"
