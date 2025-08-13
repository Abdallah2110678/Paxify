from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    User,
    Patient,
    Doctor,
    AdminProfile,
    Appointment,
)

# ---------- Basic serializers ----------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "first_name", "last_name", "role"]


class PatientSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)
    user_name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Patient
        fields = [
            "id",
            "user",
            "user_email",
            "user_name",
            "medical_history",
            "gender",
            "date_of_birth",
        ]


class DoctorSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source="user.email", read_only=True)
    user_name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Doctor
        fields = [
            "id",
            "user",
            "user_email",
            "user_name",
            "specialization",
            "availability_schedule",
            "profile_description",
        ]


class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="doctor.user.username", read_only=True)
    doctor_email = serializers.EmailField(source="doctor.user.email", read_only=True)
    patient_name = serializers.CharField(
        source="patient.user.username", read_only=True, default=None
    )
    patient_email = serializers.EmailField(
        source="patient.user.email", read_only=True, default=None
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "doctor",
            "doctor_name",
            "doctor_email",
            "patient",
            "patient_name",
            "patient_email",
            "date_time",
            "session_type",
            "status",
            "price",
        ]


# ---------- Auth / Signup serializers ----------

class SignupSerializer(serializers.ModelSerializer):
    """
    Creates a User and (based on role) a Patient/Doctor/Admin profile.
    Required fields per role:
      - patient: gender, date_of_birth (medical_history optional)
      - doctor: specialization, availability_schedule, profile_description
      - admin : none (creates AdminProfile with default level)
    """
    # patient fields
    medical_history = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    gender = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    # doctor fields
    specialization = serializers.CharField(required=False)
    availability_schedule = serializers.CharField(required=False)
    profile_description = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
            "role",
            # patient
            "medical_history",
            "gender",
            "date_of_birth",
            # doctor
            "specialization",
            "availability_schedule",
            "profile_description",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "first_name": {"required": False, "allow_blank": True},
            "last_name": {"required": False, "allow_blank": True},
        }

    def validate_email(self, value):
        # enforce case-insensitive uniqueness
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        role = validated_data.get("role")
        password = validated_data.pop("password")

        # Extract optional role-specific fields
        patient_fields = {
            k: validated_data.pop(k, None)
            for k in ("medical_history", "gender", "date_of_birth")
        }
        doctor_fields = {
            k: validated_data.pop(k, None)
            for k in ("specialization", "availability_schedule", "profile_description")
        }

        # Create user
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        # Create profile based on role
        if role == "patient":
            if not patient_fields.get("gender") or not patient_fields.get("date_of_birth"):
                raise serializers.ValidationError({
                    "detail": "gender and date_of_birth are required for patient signup."
                })
            Patient.objects.create(user=user, **patient_fields)

        elif role == "doctor":
            required = ["specialization", "availability_schedule", "profile_description"]
            missing = [f for f in required if not doctor_fields.get(f)]
            if missing:
                raise serializers.ValidationError({f: "Required for doctor signup." for f in missing})
            Doctor.objects.create(user=user, **doctor_fields)

        elif role == "admin":
            # You can choose a different default level
            AdminProfile.objects.create(user=user, admin_level="standard")

        else:
            # Although model choices already constrain this, keep a guard
            raise serializers.ValidationError({"role": "Invalid role."})

        return user


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT serializer:
      - Works with email (USERNAME_FIELD='email')
      - Adds role & email to token claims
      - Returns a lightweight 'user' object alongside tokens
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["email"] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)  # returns access/refresh
        data["user"] = {
            "id": str(self.user.id),
            "email": self.user.email,
            "role": self.user.role,
        }
        return data
