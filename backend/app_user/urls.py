from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('patient/registration/',views.PatientRegistrationViewSet.as_view(),name='patientRegistration'),
    path('doctor/registration/',views.DoctorRegistrationViewSet.as_view(),name='doctorRegistration'),
    path('activate/<uid64>/<token>/',views.activate,name='activate'),
    path('login/',views.LoginSerializerView.as_view(),name='login'),
    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('update-name/',views.UserNameUpdateView.as_view(),name='userName'),
    path('update-profile/',views.UserProfileUpdateView.as_view(),name='userProfile'),
]
