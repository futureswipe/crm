# Generated by Django 3.2.5 on 2021-08-03 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saloon', '0010_auto_20210729_1549'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]