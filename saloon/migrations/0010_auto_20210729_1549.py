# Generated by Django 3.2.5 on 2021-07-29 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saloon', '0009_alter_products_residue'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companysilver',
            name='price',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='products',
            name='count',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
