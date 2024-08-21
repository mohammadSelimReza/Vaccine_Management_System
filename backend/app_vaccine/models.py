from django.db import models
from app_user.models import DoctorModel
from .constants import SELECTED_DISTRICTS,TARGET_PEOPLE
class VaccineModel(models.Model):
    slug = models.SlugField(max_length=100,unique=True, null=True, blank=True)
    vaccine_name = models.CharField(max_length=100,null=True, blank=True)
    vaccine_manufacturer = models.CharField(max_length=100,null=True, blank=True)
    vaccine_type = models.CharField(max_length=100,null=True, blank=True)
    vaccine_distribution_method = models.CharField(max_length=100,null=True, blank=True)
    vaccine_quantity = models.IntegerField(null=True, blank=True)
    vaccine_batch_number = models.CharField(max_length=100,null=True, blank=True)
    vaccine_expiry_date = models.DateField(null=True, blank=True)
    vaccine_manufacture_date = models.DateField(null=True, blank=True)
    vaccine_status = models.CharField(max_length=100,null=True, blank=True)
    vaccine_last_updated = models.DateTimeField(auto_now=True,null=True, blank=True)
    added_by = models.ForeignKey(DoctorModel, related_name="vaccines_added", on_delete=models.CASCADE)

    # def save(self, *args, **kwargs):
    #     if not hasattr(self.added_by, 'Doctor'):
    #         raise ValueError("Only doctors can add vaccines.")
    #     super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.vaccine_name} (Added by Dr. {self.added_by.user_detail.user.username})"


class VaccineCampaignModel(models.Model):
    slug = models.SlugField(max_length=100,unique=True, null=True, blank=True)
    campaign_name = models.CharField(max_length=100)
    campaign_area = models.CharField(choices=SELECTED_DISTRICTS, max_length=20)
    campaign_start = models.DateTimeField()
    campaign_end = models.DateTimeField()
    campaign_for = models.CharField(choices=TARGET_PEOPLE,max_length=10)
    target_populations = models.PositiveIntegerField()
    added_by = models.ForeignKey(DoctorModel, related_name="campaigns_added", on_delete=models.CASCADE)
    # def save(self, *args, **kwargs):
    #     if not hasattr(self.added_by, 'Doctor'):
    #         raise ValueError("Only doctors can add campaign.")
    #     super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.campaign_name} (Added by Dr. {self.added_by.user_detail.user.username})"