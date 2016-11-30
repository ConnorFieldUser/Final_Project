from django import forms

from django.core.mail import send_mail


class SignUpForm(forms.Form):

    def __init__(self, user, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.user = user

    sent_by = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)

    def send_email(self):
        sent_by = self.cleaned_data["sent_by"]
        message = self.cleaned_data["message"]
        subject = "Singup request"
        body = "Signup request from: {}     message: {}     from: {}".format(self.user, message, sent_by)
        recipient_list = ["botemail52@gmail.com"]
        send_mail(subject, body, "storetodoor.heroku@gmail.com", recipient_list)
