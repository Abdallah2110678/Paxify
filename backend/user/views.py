from rest_framework import viewsets
from .models import User, Patient, Doctor, Appointment
from .serializers import UserSerializer, PatientSerializer, DoctorSerializer, AppointmentSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    def get_queryset(self):
        # Show only doctor's appointments
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            return Appointment.objects.filter(doctor_id=doctor_id)
        return super().get_queryset()