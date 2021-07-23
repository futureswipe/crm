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