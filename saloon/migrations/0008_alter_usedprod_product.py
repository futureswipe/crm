# Generated by Django 3.2.5 on 2021-07-27 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('saloon', '0007_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usedprod',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='productes', to='saloon.products'),
        ),
    ]
