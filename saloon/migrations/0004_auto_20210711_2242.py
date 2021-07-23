# Generated by Django 3.2.4 on 2021-07-11 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('saloon', '0003_auto_20210611_1457'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='birthday',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='withcompany',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='company', to='saloon.companysilver'),
        ),
    ]
