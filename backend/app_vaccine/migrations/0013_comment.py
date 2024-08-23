# Generated by Django 5.1 on 2024-08-23 18:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_user', '0005_alter_doctormodel_user_type'),
        ('app_vaccine', '0012_alter_vaccinecampaignmodel_campaign_vaccine_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('campaign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='app_vaccine.vaccinecampaignmodel')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='app_user.patientmodel')),
            ],
            options={
                'unique_together': {('patient', 'campaign')},
            },
        ),
    ]
