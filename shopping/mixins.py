from django.contrib.auth.mixins import UserPassesTestMixin


class DriverAccessMixin(UserPassesTestMixin):
    login_url = '/'
    redirect_field_name = None

    def test_func(self):
        return self.request.user.account.user_type == "d"
