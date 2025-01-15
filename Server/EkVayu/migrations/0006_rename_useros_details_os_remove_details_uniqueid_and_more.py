# Generated by Django 5.1.4 on 2025-01-14 05:44

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EkVayu', '0005_alter_details_phone'),
    ]

    operations = [
        migrations.RenameField(
            model_name='details',
            old_name='UserOS',
            new_name='os',
        ),
        migrations.RemoveField(
            model_name='details',
            name='UniqueID',
        ),
        migrations.RemoveField(
            model_name='details',
            name='Username',
        ),
        migrations.AddField(
            model_name='details',
            name='Timezone',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='details',
            name='ekvayu_visit_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='details',
            name='unique_id',
            field=models.CharField(default='default_unique_id', max_length=100, unique=True),
        ),
        migrations.AddField(
            model_name='details',
            name='visit_timestamp',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='details',
            name='visited_routes',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='details',
            name='email',
            field=models.EmailField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='details',
            name='username',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
