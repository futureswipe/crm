from django.urls import path

from .views import *


urlpatterns = [
    path('', user_login, name='login'),
    path('index/', index, name='index'),

    path('service/create/', ServiceCreateView.as_view()),
    path('service/update/<int:id>/', ServiceUpdateView.as_view()),
    path('service/delete/<int:id>/', ServiceDeleteView.as_view()),
    path('service/', ServiceListView.as_view()),

    path('worker/create/', WorkerCreateView.as_view()),
    path('worker/', WorkerListView.as_view()),
    path('worker/update/<int:id>/', WorkerUpdateView.as_view()),
    path('worker/delete/<int:id>/', WorkerDeleteView.as_view()),

    path('unit/create/', UnitCreateView.as_view()),
    path('unit/update/<int:id>/', UnitUpdateView.as_view()),
    path('unit/delete/<int:id>/', UnitDeleteView.as_view()),
    path('unit/', UnitListView.as_view()),

    path('customer/create/', CustomerCreateView.as_view()),
    path('customer/', CustomerListView.as_view()),
    path('customer/update/<int:id>/', CustomerUpdateView.as_view()),
    path('customer/delete/<int:id>/', CustomerDeleteView.as_view()),

    path('company/create/', CompanySilverCreateView.as_view()),
    path('company/', CompanySilverListView.as_view()),
    path('company/update/<int:id>/', CompanySilverUpdateView.as_view()),
    path('company/delete/<int:id>/', CompanySilverDeleteView.as_view()),

    path('product/create/', ProductCreateView.as_view()),
    path('product/', ProductListView.as_view()),
    path('product/update/<int:id>/', ProductUpdateView.as_view()),
    path('product/delete/<int:id>/', ProductDeleteView.as_view()),
    path('product/category<int:id>/', ProductCatListView.as_view()),

    path('zametka/create/', ZametkaCreateView.as_view()),
    path('zametka/update/<int:id>/', ZametkaUpdateView.as_view()),
    path('zametka/delete/<int:id>/', ZametkaDeleteView.as_view()),
    path('zametka/', ZametkaListView.as_view()),

    path('order/create/', OrderCreateView.as_view()),
    path('order/update/<int:id>/', OrderUpdateView.as_view()),
    path('order/delete/<int:id>/', OrderDeleteView.as_view()),
    path('order/', OrderListView.as_view()),
    path('order/items/<int:id>/', OrderItemListView.as_view()),   #oder itemlarini olish uchun
    path('order/item/create/', OrderItemCreateView.as_view()),

    path('birthday/delete/<int:id>/', BirthdayDeleteView.as_view()),      # Birthday delete
    path('birthday/update/<int:id>/', BirthdayUpdateView.as_view()),      # Birthday update
    path('birthday/', BirthdayListView.as_view()),                         # Birthday


    path('used/prod/', UsedProdListView.as_view()),                         # usedprod
    path('used/delete/<int:id>/', UsedProdDeleteView.as_view()),

    path('linegraph/days/', LinegraphDaysListView.as_view()),
    path('linegraph/month/', LinegraphMonthListView.as_view()),
]
