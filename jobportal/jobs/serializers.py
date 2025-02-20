from rest_framework import serializers
from .models import JobPost, JobApplication
from django.utils.timezone import now


class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = "__all__"
        read_only_fields = ["recruiter"]

    def validate_company_name(self, value):
        """Ensure company name is not empty or just whitespace."""
        if not value.strip():
            raise serializers.ValidationError("Company name cannot be empty.")
        return value

    def validate_due_date(self, value):
        """Ensure due_date is a valid future datetime."""
        if value <= now():  # Use timezone-aware datetime
            raise serializers.ValidationError("Due date must be in the future.")
        return value


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = "__all__"
        read_only_fields = ["candidate", "applied_at"]
