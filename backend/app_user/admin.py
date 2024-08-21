from django.contrib import admin
from .models import UserDetails,PatientModel,PatientHistoryImage,DoctorModel
# Register your models here.
admin.site.register(UserDetails)
admin.site.register(PatientModel)
admin.site.register(PatientHistoryImage)
admin.site.register(DoctorModel)