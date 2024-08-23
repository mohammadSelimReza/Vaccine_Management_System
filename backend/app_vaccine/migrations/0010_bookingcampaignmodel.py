# Generated by Django 5.1 on 2024-08-23 17:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_vaccine', '0009_alter_bookingmodel_dose_dates_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookingCampaignModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=20)),
                ('patient_age', models.PositiveIntegerField()),
                ('first_dose_date', models.DateField()),
                ('dose_dates', models.JSONField(blank=True, default=list)),
                ('vaccine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booked_campaign', to='app_vaccine.vaccinecampaignmodel')),
            ],
        ),
    ]
