# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-21 14:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0009_auto_20161120_0249'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='picture',
            field=models.FileField(default=1, upload_to=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='account',
            name='user_type',
            field=models.CharField(choices=[('c', 'Customer'), ('d', 'Driver')], max_length=1),
        ),
    ]
