# Generated by Django 5.1.4 on 2025-01-14 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EkVayu', '0010_remove_details_ekvayu_visit_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='details',
            name='ekvayu_visit_count',
            field=models.IntegerField(default=0),
        ),
    ]
