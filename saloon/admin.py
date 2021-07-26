from django.contrib import admin

from .models import *


@admin.register(Workers)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ['name', 'surename']


@admin.register(Services)
class ServicesAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


@admin.register(CompanySilver)
class CompanySilverAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


@admin.register(UsedProd)
class UsedProdAdmin(admin.ModelAdmin):
    list_display = ['id', 'product']


@admin.register(UsedMonth)
class UsedMonthAdmin(admin.ModelAdmin):
    list_display = ['id', 'month']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer']


@admin.register(OrderItems)
class OrderItemsAdmin(admin.ModelAdmin):
    list_display = ['id', 'product']


@admin.register(Birthday)
class BirthdayAdmin(admin.ModelAdmin):
    list_display = ['id', 'fullname', 'birthday']



