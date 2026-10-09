from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "first_name",
            "last_name",
            "date_of_birth",
            "grade",
            "phone",
            "email",
        ]
        read_only_fields = ["id"]