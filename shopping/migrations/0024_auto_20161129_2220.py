# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-29 22:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopping', '0023_auto_20161129_2218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.CharField(blank=True, max_length=999, null=True),
        ),
    ]