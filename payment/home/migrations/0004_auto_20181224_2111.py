# Generated by Django 2.1.1 on 2018-12-24 21:11

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20181224_2102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardpayments',
            name='how_many',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(1000), django.core.validators.MaxValueValidator(75000)], verbose_name='Сколько'),
        ),
    ]
