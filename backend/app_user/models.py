from django.db import models
from django.contrib.auth.models import User
from .constants import GENDER_TYPE,USER_TYPE
from .validators import generate_unique_patient_number,validate_nid, validate_phone_number
from django.core.files.base import ContentFile
# Create your models here.
class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='user_detail')
    birth_date = models.DateField()
    gender = models.CharField(max_length=10,choices=GENDER_TYPE)
    nid = models.IntegerField(validators=[validate_nid])
    phone_number = models.CharField(max_length=15, validators=[validate_phone_number])
    city = models.CharField(max_length=20)
    street_address = models.CharField(max_length=100)
    zip_code = models.IntegerField()
    user_type = models.CharField(choices=USER_TYPE)
    user_photo = models.ImageField(upload_to='images/user/',blank=True)
    
    def save(self, *args, **kwargs):
        if not self.user_photo:
            if self.gender == 'male':
                self.user_photo = self.get_default_photo('male')
            elif self.gender == 'female':
                self.user_photo = self.get_default_photo('female')
        
        super().save(*args, **kwargs)

    def get_default_photo(self, gender):
        # Generate an in-memory image
        if gender == 'male':
            default_image_path = 'images/user/male_default.png'
        elif gender == 'female':
            default_image_path = 'images/user/female_default.png'
        else:
            default_image_path = 'images/user/default_user.png'
        
        try:
            with open(default_image_path, 'rb') as image_file:
                return ContentFile(image_file.read(), 'default_photo.jpg')
        except FileNotFoundError:
            return None
    
    def __str__(self) -> str:
        return self.user.username
    
    
class PatientModel(models.Model):
    user_detail = models.OneToOneField(UserDetails, on_delete=models.CASCADE, related_name='patient')
    patient_id = models.CharField(max_length=6,unique=True,blank=True,editable=False)
    
    def save(self, *args, **kwargs):
        if not self.patient_id:
            self.patient_id = generate_unique_patient_number()
        if self.user_detail.user_type != 'Patient':
            raise ValueError('User type must be patient to create a patient profile.')
        super().save(*args, **kwargs)
    
    def __str__(self) -> str:
        return f"{self.user_detail.user.username}   {self.patient_id}"

class PatientHistoryImage(models.Model):
    patient = models.ForeignKey(PatientModel, on_delete=models.CASCADE, related_name='history')
    patient_previous_history = models.TextField(max_length=200)
    image = models.ImageField(upload_to='report/')
    
    def __str__(self):
        return f"Image for {self.patient.user_detail.user.username}"

class DoctorModel(models.Model):
    user_detail = models.OneToOneField(UserDetails,on_delete=models.CASCADE,related_name='doctor')
    license_id = models.CharField(max_length=20)
    specialty = models.CharField(max_length=20)
    is_valid = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if self.user_detail.user_type != 'Doctor':
            raise ValueError('User type must be doctor to create a doctor profile.')
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.user_detail.user.username
