from rest_framework import serializers
from .models import User, Patient, Doctor, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role']

class PatientSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'user_email', 'user_name', 'medical_history', 'gender', 'date_of_birth']


class DoctorSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)  
    user_name = serializers.CharField(source='user.username', read_only=True)  

    class Meta:
        model = Doctor
        fields = ['id', 'user', 'user_email', 'user_name', 'specialization', 'availability_schedule', 'profile_description']


class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.user.username', read_only=True)
    doctor_email = serializers.EmailField(source='doctor.user.email', read_only=True)
    patient_name = serializers.CharField(source='patient.user.username', read_only=True, default=None)
    patient_email = serializers.EmailField(source='patient.user.email', read_only=True, default=None)

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_name', 'doctor_email', 'patient', 
                  'patient_name', 'patient_email', 'date_time', 'session_type', 'status', 'price']
