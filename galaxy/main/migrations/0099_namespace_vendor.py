# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-22 17:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0098_readme'),
    ]

    operations = [
        migrations.AddField(
            model_name='namespace',
            name='is_vendor',
            field=models.BooleanField(default=False),
        ),
    ]
