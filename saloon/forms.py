from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control w-100 fw-bold t-dark'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control w-100 fw-bold t-dark'}))