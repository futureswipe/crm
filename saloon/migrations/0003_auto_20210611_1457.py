# Generated by Django 3.2.4 on 2021-06-11 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saloon', '0002_alter_workers_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='count',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='products',
            name='price',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='products',
            name='priceall',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='products',
            name='residue',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
