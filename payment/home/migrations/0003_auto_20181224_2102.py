# Generated by Django 2.1.1 on 2018-12-24 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_cardpayments_is_safe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardpayments',
            name='how_many',
            field=models.CharField(max_length=5, null=True, verbose_name='Сколько'),
        ),
    ]
