from django.db import models


class Services(models.Model):
    title = models.CharField(max_length=30)
    price = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Xizmat"
        verbose_name_plural = "Xizmatlar"


class Workers(models.Model):
    name = models.CharField(max_length=25)
    surename = models.CharField(max_length=25)
    position = models.ForeignKey(Services, verbose_name="kasbi", on_delete=models.SET_NULL, null=True)
    tel = models.CharField(max_length=22)
    address = models.CharField(max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Ishchi"
        verbose_name_plural = "Ishchilar"


class Unit(models.Model):
    title = models.CharField(max_length=18)

    def __str__(self):
        return self.title


class Customer(models.Model):
    name = models.CharField(max_length=18)
    surname = models.CharField(max_length=18)
    birthday = models.DateField(null=True)
    phone = models.CharField(max_length=20)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CompanySilver(models.Model):
    title = models.CharField(max_length=20)
    price = models.PositiveIntegerField()
    created = models.DateField(auto_now=True)

    def __str__(self):
        return self.title


class Products(models.Model):
    title = models.CharField(max_length=25)
    company = models.CharField(max_length=25)
    category = models.ForeignKey(Services, related_name="servis", on_delete=models.SET_NULL, null=True, blank=True)
    measurement = models.ForeignKey(Unit, related_name="unit", on_delete=models.SET_NULL, null=True, blank=True)
    count = models.PositiveIntegerField(null=True, blank=True)
    price = models.PositiveIntegerField(null=True, blank=True)
    priceall = models.PositiveIntegerField(null=True, blank=True)
    residue = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


class UsedProd(models.Model):
    product = models.ForeignKey(Products, related_name="productes", on_delete=models.SET_NULL, null=True, blank=True)
    used = models.PositiveIntegerField()
    created = models.DateField(auto_now=True)

    def __str__(self):
        return self.product


class UsedMonth(models.Model):
    product = models.CharField(max_length=25)
    used = models.PositiveIntegerField()
    month = models.DateField(auto_now=True)


class Order(models.Model):
    customer = models.ForeignKey(Customer, related_name="cust", on_delete=models.SET_NULL, null=True)
    withcompany = models.ForeignKey(CompanySilver, related_name='company', on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(Services, related_name='cat', on_delete=models.SET_NULL, null=True)
    worker = models.ForeignKey(Workers, related_name='work', on_delete=models.SET_NULL, null=True)
    created = models.DateField(auto_now_add=True, null=True, blank=True)


class OrderItems(models.Model):
    orderid = models.ForeignKey(Order, related_name='order', on_delete=models.CASCADE)
    product = models.ForeignKey(Products, related_name='product', on_delete=models.SET_NULL, null=True)
    used = models.PositiveIntegerField()


class Zametka(models.Model):
    text = models.TextField()
    checked = models.BooleanField(default=False)


class Birthday(models.Model):
    fullname = models.CharField(max_length=100)
    birthday = models.DateField()
    tel = models.CharField(max_length=25, blank=True, null=True)
    view = models.BooleanField(default=False)
