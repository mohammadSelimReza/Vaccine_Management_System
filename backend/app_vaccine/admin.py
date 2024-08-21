from django.contrib import admin
from .models import VaccineModel,VaccineCampaignModel
# Register your models here.
class VaccineAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('vaccine_name',)}
    list_display = ['vaccine_name','get_added_by_username']
    def get_added_by_username(self, obj):
        return obj.added_by.user_detail.user.username
    get_added_by_username.short_description = 'Added By'
admin.site.register(VaccineModel,VaccineAdminModel)

class VaccineCampaignAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('campaign_name',)}
    list_display = ['campaign_name','get_added_by_username']
    def get_added_by_username(self, obj):
        return obj.added_by.user_detail.user.username
    get_added_by_username.short_description = 'Added By'
admin.site.register(VaccineCampaignModel,VaccineCampaignAdminModel)