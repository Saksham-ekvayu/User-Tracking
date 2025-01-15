# Generated by Django 5.1.4 on 2025-01-15 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EkVayu', '0011_details_ekvayu_visit_count'),
    ]

    operations = [
        migrations.CreateModel(
            name='Offers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('features', models.JSONField(default=list)),
            ],
            options={
                'verbose_name_plural': 'Offers',
            },
        ),
    ]
