from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from datetime import date
import datetime
from django.views.decorators.csrf import csrf_exempt
from braces.views import CsrfExemptMixin
from django.db.models import F

from django.contrib.auth import authenticate, login

from rest_framework.views import APIView

from .models import *
from .serializers import *
from .forms import LoginForm


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect('/index/')
                else:
                    return render(request, 'login.html', {'form': form})
            else:
                return render(request, 'login.html', {'form': form})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})


@login_required
def index(request):
    today = date.today()
    birthday = Customer.objects.filter(birthday__day=today.day, birthday__month=today.month)
    if birthday:
        for birth in birthday:
            fullname = ""
            fullname += birth.name
            fullname += " " + birth.surname
            if not Customer.objects.filter(phone=birth.phone):
                Birthday.objects.create(fullname=fullname, birthday=birth.birthday, tel=birth.phone)
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
            serviceid = Services.objects.create(title=service.data['title'], price=service.data['price'])
            return JsonResponse({"id": serviceid.id}, safe=False)
        else:
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
            workerid = Workers.objects.create(name=worker.data['name'], surename=worker.data['surename'],
                                              position_id=worker.data['position'], tel=worker.data['tel'],
                                              address=worker.data['address'])
            return JsonResponse({"id": workerid.id}, safe=False)
        else:
            return Response(status=500)


class WorkerUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        worker = WorkersCreateSerializer(data=request.data)
        if worker.is_valid():
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
            unitid = Unit.objects.create(title=unit.data['title'])
            return JsonResponse({"id": unitid.id}, safe=False)
        else:
            return Response(status=201)


class UnitUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        unit = UnitCreateSerializer(data=request.data)
        if unit.is_valid():
            Unit.objects.filter(id=id).update(title=unit.data['title'])
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
            customerid = Customer.objects.create(name=customer.data['name'], surname=customer.data['surname'],
                                                 birthday=customer.data['birthday'], phone=customer.data['phone'])
            return JsonResponse({"id": customerid.id}, safe=False)
        else:
            return Response(status=500)


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
            companyid = CompanySilver.objects.create(title=company.data['title'], price=company.data['price'])
            return JsonResponse({"id": companyid.id}, safe=False)
        else:
            return Response(status=500)


class CompanySilverUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        company = CompanySilverCreateSerializer(data=request.data)
        if company.is_valid():
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
            productid = Products.objects.create(title=product.data['title'], company=product.data['company'],
                                                category_id=product.data['category'],
                                                measurement_id=product.data['measurement'],
                                                count=product.data['count'], price=product.data['price'],
                                                priceall=product.data['priceall'],
                                                residue=product.data['residue']
                                                )
            return JsonResponse({"id": productid.id}, safe=False)
        else:
            return Response(status=500)


class ProductUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        product = ProductCreateSerializer(data=request.data)
        if product.is_valid():
            Products.objects.filter(id=id).update(title=product.data['title'], company=product.data['company'],
                                                  category=product.data['category'],
                                                  measurement=product.data['measurement'],
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
        today = date.today()
        birthday = Birthday.objects.filter(birthday__day=today.day, birthday__month=today.month)
        serializer = BirthdayListSerializer(birthday, many=True)
        return Response(serializer.data)


class BirthdayUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        birthday = BirthdayCreateSerializer(data=request.data)
        if birthday.is_valid():
            Birthday.objects.filter(id=id).update(checked=birthday.data['checked'])
            return Response(status=201)
        else:
            return Response(status=500)


class BirthdayDeleteView(APIView):
    def get(self, request, id):
        birthday = get_object_or_404(Birthday, pk=id)
        birthday.delete()
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
            zametkaid = Zametka.objects.create(text=zametka.data['text'], checked=zametka.data['checked'])
            return JsonResponse({"id": zametkaid.id}, safe=False)
        else:
            return Response(status=500)


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


class OrderListView(APIView):
    '''Xizmatlarni chiqarish'''

    def get(self, request):
        order = Order.objects.all()
        serializer = OrderListSerializer(order, many=True)
        return Response(serializer.data)


class OrderCreateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request):
        order = OrderCreateSerializer(data=request.data)
        if order.is_valid():
            orderid = Order.objects.create(customer_id=order.data['customer'], withcompany_id=order.data['withcompany'],
                                           category_id=order.data['category'], worker_id=order.data['worker'])
            if orderid.withcompany_id:
                print("ishla")
                serv = Services.objects.get(id=orderid.category_id)
                CompanySilver.objects.filter(id=orderid.withcompany_id).update(price=F('price') - serv.price)
                print("ishladi")
            return JsonResponse({"id": orderid.id, "category": orderid.category.id}, safe=False)
        else:
            return Response(status=500)


class OrderUpdateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request, id):
        order = OrderCreateSerializer(data=request.data)
        if order.is_valid():
            orderid = Order.objects.filter(id=id).update(customer_id=order.data['customer'],
                                                         withcompany_id=order.data['withcompany'],
                                                         category_id=order.data['category'],
                                                         worker_id=order.data['worker'])
            if orderid.withcompany:
                print("ishla")
                serv = Services.objects.get(id=orderid.category_id)
                CompanySilver.objects.filter(id=orderid.withcompany_id).update(price=F('price') - serv.price)
                print("ishladi")
            return Response(status=201)
        else:
            return Response(status=500)


class OrderDeleteView(APIView):
    def get(self, request, id):
        order = get_object_or_404(Order, pk=id)
        order.delete()
        return Response(status=201)


class OrderItemListView(APIView):
    '''Xizmatlarni chiqarish'''

    def get(self, request, id):
        items = OrderItems.objects.filter(orderid__id=id)
        serializer = OrderItemListSerializer(items, many=True)
        return Response(serializer.data)


class OrderItemCreateView(CsrfExemptMixin, APIView):
    authentication_classes = []

    def post(self, request):
        order = OrderItemCreateSerializer(data=request.data)
        today = date.today()
        if order.is_valid():
            OrderItems.objects.create(orderid_id=order.data['orderid'], product_id=order.data['product'],
                                      used=order.data['used'])
            productid = Products.objects.get(id=order.data['product'])
            summ = 0
            if productid.count:
                summ = (productid.price * order.data['used']) / (
                        productid.count / (productid.priceall / productid.price))
            ooops = Order.objects.get(id=order.data['orderid'])
            if ooops.withcompany_id:
                CompanySilver.objects.filter(id=ooops.withcompany_id).update(price=F('price') - summ)
            if not productid.residue:
                Products.objects.filter(id=productid.id).update(residue=productid.count - order.data['used'])
            else:
                Products.objects.filter(id=productid.id).update(residue=productid.residue - order.data['used'])
            if UsedProd.objects.filter(product_id=productid.id):
                usedcount = UsedProd.objects.get(product_id=productid.id)
                if usedcount.created.month == today.month and usedcount.created.year == today.year:
                    UsedProd.objects.filter(product_id=productid.id).update(used=usedcount.used + order.data['used'])
                else:
                    UsedProd.objects.create(product=order.data['product'], used=order.data['used'])
            else:
                UsedProd.objects.create(product_id=order.data['product'], used=order.data['used'])
            return JsonResponse({"id": order.data['orderid']}, safe=False)
        else:
            return Response(status=450)


class LinegraphDaysListView(APIView):
    '''Ishchilarni chiqarish'''

    def get(self, request):
        today = date.today()
        content = {}
        for i in range(1, 8):
            days = datetime.timedelta(i)
            day = today - days
            orders = Order.objects.filter(created__day=day.day)
            if orders:
                content[str(day)] = orders.count()
            else:
                content[str(day)] = 0
        return JsonResponse({"id": content}, safe=False)


class LinegraphMonthListView(APIView):
    '''Ishchilarni chiqarish'''

    def get(self, request):
        today = date.today()
        content = {}
        for i in range(1, 32):
            days = datetime.timedelta(i)
            day = today - days
            orders = Order.objects.filter(created__day=day.day)
            if orders:
                content[str(day)] = orders.count()
            else:
                content[str(day)] = 0
        return JsonResponse({"id": content}, safe=False)


class UsedProdListView(APIView):
    '''Xizmatlarni chiqarish'''

    def get(self, request):
        usedprod = UsedProd.objects.all()
        serializer = UsedProdListSerializer(usedprod, many=True)
        return Response(serializer.data)


class UsedProdDeleteView(APIView):
    def get(self, request, id):
        order = get_object_or_404(UsedProd, pk=id)
        order.delete()
        return Response(status=201)
