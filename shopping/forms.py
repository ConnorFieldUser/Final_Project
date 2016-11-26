from django import forms

from django.core.mail import send_mail


class SignUpForm(forms.Form):

    sent_by = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)

    def send_email(self):
        sent_by = self.cleaned_data["sent_by"]
        message = self.cleaned_data["message"]
        subject = "Contact form submission"
        body = "test email from: {}     message: {} ".format(sent_by, message)
        recipient_list = ["botemail52@gmail.com"]
        send_mail(subject, body, "botemail52@gmail.com", recipient_list)
