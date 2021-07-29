from rest_framework import serializers

from .models import *


class ServiceListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    class Meta:
        model = Services
        fields = ('id', 'title', 'price')


class ServiceCreateSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    class Meta:
        model = Services
        fields ="__all__"



class WorkersListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    position = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = Workers
        fields = ('id', 'name', 'surename', 'position', 'tel', 'address')


class WorkersCreateSerializer(serializers.ModelSerializer):
    ''' Ishchilar kiritish'''

    class Meta:
        model = Workers
        fields = "__all__"



class UnitListSerializer(serializers.ModelSerializer):
    ''' O'lchov birliklar ro'yxati'''

    class Meta:
        model = Services
        fields = ('id', 'title')


class UnitCreateSerializer(serializers.ModelSerializer):
    ''' O'lchov birliklar yaratishs'''

    class Meta:
        model = Services
        fields ="__all__"



class CustomerListSerializer(serializers.ModelSerializer):
    ''' Mijozlar ro'yxati'''

    class Meta:
        model = Customer
        fields = ('id', 'name', 'surname', 'birthday', 'phone', 'created')


class CustomerCreateSerializer(serializers.ModelSerializer):
    ''' Mijozlar kiritish'''

    class Meta:
        model = Customer
        fields = "__all__"



class CompanySilverListSerializer(serializers.ModelSerializer):
    ''' Mijozlar ro'yxati'''

    class Meta:
        model = CompanySilver
        fields = ('id', 'title', 'price', 'created')


class CompanySilverCreateSerializer(serializers.ModelSerializer):
    ''' Mijozlar kiritish'''

    class Meta:
        model = CompanySilver
        fields = "__all__"



class ProductListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    category = serializers.SlugRelatedField(slug_field="title", read_only=True)
    measurement = serializers.SlugRelatedField(slug_field="title", read_only=True)
    class Meta:
        model = Products
        fields = ('id', 'title', 'company', 'category', 'measurement', 'count', 'price', 'priceall', 'residue')


class ProductCreateSerializer(serializers.ModelSerializer):
    ''' Ishchilar kiritish'''

    class Meta:
        model = Products
        fields = "__all__"



class OrderListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    customer = serializers.SlugRelatedField(slug_field="name", read_only=True)
    withcompany = serializers.SlugRelatedField(slug_field="title", read_only=True)
    category = serializers.SlugRelatedField(slug_field="title", read_only=True)
    worker = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'customer', 'withcompany', 'category', 'worker', 'created')

class OrderCreateSerializer(serializers.ModelSerializer):
    ''' Zakaz yaratish'''

    class Meta:
        model = Order
        fields = "__all__"


class ZametkaListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    class Meta:
        model = Zametka
        fields = ('id', 'text', 'checked')


class ZametkaCreateSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    class Meta:
        model = Zametka
        fields ="__all__"


class BirthdayListSerializer(serializers.ModelSerializer):
    ''' Tugilgan kun ro'yxati'''

    class Meta:
        model = Birthday
        fields = ('id', 'fullname', 'birthday')


class BirthdayCreateSerializer(serializers.ModelSerializer):
    ''' Tugilgan kun ro'yxati'''

    class Meta:
        model = Birthday
        fields ="__all__"


class OrderItemListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    product = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = OrderItems
        fields = ('id', 'product', 'used')


class OrderItemCreateSerializer(serializers.ModelSerializer):
    ''' Tugilgan kun ro'yxati'''

    class Meta:
        model = OrderItems
        fields = "__all__"


class UsedProdListSerializer(serializers.ModelSerializer):
    ''' Ishchilar ro'yxati'''

    product = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = UsedProd
        fields = ('id', 'product', 'used', 'created')