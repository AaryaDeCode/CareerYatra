# Generated by Django 5.1.6 on 2025-02-20 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0004_alter_jobpost_company_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobpost',
            name='company_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
