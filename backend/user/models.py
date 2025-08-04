from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=[
            ('patient', 'Patient'),
            ('doctor', 'Doctor'),
            ('admin', 'Admin'),
        ]
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 
    
    def __str__(self):
        return f"{self.email} ({self.role})"


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    medical_history = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=10)
    date_of_birth = models.DateField()

    def __str__(self):
        return f"Patient: {self.user.email}"


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100)
    availability_schedule = models.TextField()  
    profile_description = models.TextField()

    def __str__(self):
        return f"Doctor: {self.user.email}"


class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    admin_level = models.CharField(max_length=50)

    def __str__(self):
        return f"Admin: {self.user.email}"


class Appointment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='bookings', null=True, blank=True)
    date_time = models.DateTimeField()
    session_type = models.CharField(max_length=50)  # "Online" or "In-person"
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('confirmed', 'Confirmed'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled')
        ]
    )

    def __str__(self):
        return f"Appointment on {self.date_time} with Dr. {self.doctor.user.username}"
