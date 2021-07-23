from rest_framework.response import Response
from django.shortcuts import render
from django.shortcuts import get_object_or_404
import datetime
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin


from rest_framework.views import APIView

from .models import *
from .serializers import *


def index(request):
    return render(request, 'index.html')


class ServiceListView(APIView):
    '''Xizmatlarni chiqarish'''
    def get(self, request):
        services = Services.objects.all()
        serializer = ServiceListSerializer(services, many=True)
        return Response(serializer.data)


class ServiceCreateView(CsrfExemptMixin, APIView):
    authentication_classes = []
    def post(self, request):
        service = ServiceCreateSerializer(data=request.data)
        if service.is_valid():
            service.save()
        return Response(status=201)


class ServiceUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []
    def post(self, request, id):
        service = ServiceCreateSerializer(data=request.data)
        if service.is_valid():
            Services.objects.filter(id=id).update(title=service.data['title'], price=service.data['price'])
        return Response(status=201)


class ServiceDeleteView(APIView):
    def get(self, request, id):
        service = get_object_or_404(Services, pk=id)
        service.delete()
        return Response(status=201)




class WorkerListView(APIView):
    '''Ishchilarni chiqarish'''
    def get(self, request):
        workers = Workers.objects.all()
        serializer = WorkersListSerializer(workers, many=True)
        return Response(serializer.data)


class WorkerCreateView(CsrfExemptMixin, APIView):
    '''Ishchilarni chiqarish'''

    authentication_classes = []

    def post(self, request):
        worker = WorkersCreateSerializer(data=request.data)
        if worker.is_valid():
            worker.save()
        return Response(status=201)


class WorkerUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        worker = WorkersCreateSerializer(data=request.data)
        if worker.is_valid():
            print(worker)
            Workers.objects.filter(id=id).update(name=worker.data['name'], surename=worker.data['surename'],
                                                 position=worker.data['position'], tel=worker.data['tel'],
                                                 address=worker.data['address'])
        return Response(status=201)


class WorkerDeleteView(APIView):
    def get(self, request, id):
        worker = get_object_or_404(Workers, pk=id)
        worker.delete()
        return Response(status=201)




class UnitListView(APIView):
    '''Xizmatlarni chiqarish'''
    def get(self, request):
        unit = Unit.objects.all()
        serializer = UnitListSerializer(unit, many=True)
        return Response(serializer.data)


class UnitCreateView(CsrfExemptMixin, APIView):
    authentication_classes = []
    def post(self, request):
        unit = UnitCreateSerializer(data=request.data)
        if unit.is_valid():
            unit.save()
        return Response(status=201)


class UnitUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        unit = UnitCreateSerializer(data=request.data)
        if unit.is_valid():
            Unit.objects.filter(id=id).update(title=unit)
        return Response(status=201)


class UnitDeleteView(APIView):
    def get(self, request, id):
        unit = get_object_or_404(Unit, pk=id)
        unit.delete()
        return Response(status=201)



class CustomerListView(APIView):
    '''Ishchilarni chiqarish'''
    def get(self, request):
        customer = Customer.objects.all()
        serializer = CustomerListSerializer(customer, many=True)
        return Response(serializer.data)


class CustomerCreateView(CsrfExemptMixin, APIView):
    '''Ishchilarni chiqarish'''
    authentication_classes = []

    def post(self, request):
        customer = CustomerCreateSerializer(data=request.data)
        if customer.is_valid():
            customer.save()
        return Response(status=201)


class CustomerUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []
    def post(self, request, id):
        customer = CustomerCreateSerializer(data=request.data)
        if customer.is_valid():
            print(customer)
            Customer.objects.filter(id=id).update(name=customer.data['name'], surname=customer.data['surname'],
                                                  birthday=customer.data['birthday'], phone=customer.data['phone'])
        return Response(status=201)


class CustomerDeleteView(APIView):
    def get(self, request, id):
        customer = get_object_or_404(Customer, pk=id)
        customer.delete()
        return Response(status=201)



class CompanySilverListView(APIView):
    '''Ishchilarni chiqarish'''
    def get(self, request):
        company = CompanySilver.objects.all()
        serializer = CompanySilverListSerializer(company, many=True)
        return Response(serializer.data)


class CompanySilverCreateView(CsrfExemptMixin, APIView):
    '''Ishchilarni chiqarish'''
    authentication_classes = []
    def post(self, request):
        company = CompanySilverCreateSerializer(data=request.data)
        if company.is_valid():
            company.save()
        return Response(status=201)


class CompanySilverUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        company = CompanySilverCreateSerializer(data=request.data)
        if company.is_valid():
            print(company)
            CompanySilver.objects.filter(id=id).update(title=company.data['title'], price=company.data['price'])
        return Response(status=201)


class CompanySilverDeleteView(APIView):
    def get(self, request, id):
        company = get_object_or_404(CompanySilver, pk=id)
        company.delete()
        return Response(status=201)



class ProductCatListView(APIView):
    '''Ishchilarni chiqarish'''
    def get(self, request, id):
        product = Products.objects.filter(category__id=id)
        serializer = ProductListSerializer(product, many=True)
        return Response(serializer.data)


class ProductListView(APIView):
    '''Ishchilarni chiqarish'''
    def get(self, request):
        product = Products.objects.all()
        serializer = ProductListSerializer(product, many=True)
        return Response(serializer.data)


class ProductCreateView(CsrfExemptMixin, APIView):
    '''Ishchilarni chiqarish'''

    authentication_classes = []
    def post(self, request):
        product = ProductCreateSerializer(data=request.data)
        if product.is_valid():
            product.save()
        return Response(status=201)


class ProductUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        product = ProductCreateSerializer(data=request.data)
        if product.is_valid():
            print(product)
            Products.objects.filter(id=id).update(title=product.data['title'], company=product.data['company'],
                                                  category=product.data['category'], measurement=product.data['measurement'],
                                                  count=product.data['count'], price=product.data['price'],
                                                  priceall=product.data['priceall'])
        return Response(status=201)


class ProductDeleteView(APIView):
    def get(self, request, id):
        product = get_object_or_404(Products, pk=id)
        product.delete()
        return Response(status=201)


class BirthdayListView(APIView):
    '''Ishchilarni chiqarish'''
    def get(self, request):
        customer = Customer.objects.filter(birthday=datetime.date.today())
        serializer = CustomerListSerializer(customer, many=True)
        return Response(serializer.data)


class BirthdayDeleteView(APIView):
    def get(self, request, id):
        customer = get_object_or_404(Customer, pk=id)
        customer.delete()
        return Response(status=201)


class ZametkaListView(APIView):
    '''Xizmatlarni chiqarish'''
    def get(self, request):
        zametka = Zametka.objects.all()
        serializer = ZametkaListSerializer(zametka, many=True)
        return Response(serializer.data)


class ZametkaCreateView(CsrfExemptMixin, APIView):
    authentication_classes = []
    def post(self, request):
        zametka = ZametkaCreateSerializer(data=request.data)
        if zametka.is_valid():
            zametka.save()
        return Response(status=201)


class ZametkaUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []
    def post(self, request, id):
        zametka = ZametkaCreateSerializer(data=request.data)
        if zametka.is_valid():
            Zametka.objects.filter(id=id).update(text=zametka.data['text'], checked=zametka.data['checked'])
        return Response(status=201)


class ZametkaDeleteView(APIView):
    def get(self, request, id):
        zametka = get_object_or_404(Zametka, pk=id)
        zametka.delete()
        return Response(status=201)
