# Generated by Django 5.1.6 on 2025-02-20 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_jobpost_company_name_jobpost_due_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobpost',
            name='company_name',
            field=models.CharField(default='Unknown', max_length=255),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='due_date',
            field=models.DateTimeField(default='Unkown'),
            preserve_default=False,
        ),
    ]
