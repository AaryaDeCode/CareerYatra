from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import JobPost, JobApplication
from .serializers import JobPostSerializer, JobApplicationSerializer
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware, is_naive

# Permission for Recruiters Only
class IsRecruiter(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == "recruiter"

# Permission for Candidates Only
class IsCandidate(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == "candidate"

class PublicJobPostView(generics.ListAPIView):
    serializer_class = JobPostSerializer
    permission_classes = [IsAuthenticated]  # Both candidates and recruiters can access

    def get_queryset(self):
        return JobPost.objects.all()  # Show all job posts to candidates

# Recruiter can Create, Update Jobs


class JobPostView(generics.ListCreateAPIView):
    serializer_class = JobPostSerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_queryset(self):
        return JobPost.objects.filter(recruiter=self.request.user)

    def perform_create(self, serializer):
        company_name = self.request.data.get("company_name", "").strip()
        due_date = self.request.data.get("due_date", None)

        if not company_name:
            return Response({"error": "Company name is required."}, status=400)

        if due_date:
            try:
                due_date_obj = parse_datetime(due_date)  # Convert string to datetime
                if due_date_obj is None:
                    raise ValueError("Invalid datetime format.")

                # Ensure timezone awareness only if it's naive
                if is_naive(due_date_obj):
                    due_date_obj = make_aware(due_date_obj)

            except ValueError:
                return Response({"error": "Invalid date format. Use ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)."}, status=400)
        else:
            return Response({"error": "Due date is required."}, status=400)

        serializer.save(recruiter=self.request.user, company_name=company_name, due_date=due_date_obj)

# Recruiter can Retrieve, Update, Delete Jobs
class JobPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobPostSerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_queryset(self):
        return JobPost.objects.filter(recruiter=self.request.user)

    def perform_update(self, serializer):
        """Validate and update a job post."""
        due_date = self.request.data.get("due_date", None)
        if due_date:
            try:
                due_date_obj = datetime.fromisoformat(due_date)
                if due_date_obj <= datetime.now():
                    return Response({"error": "Due date must be in the future."}, status=400)
            except ValueError:
                return Response({"error": "Invalid date format. Use ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)."}, status=400)

        serializer.save()

# Recruiter sees candidates who applied
class JobApplicantsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_queryset(self):
        job_id = self.kwargs["job_id"]
        return JobApplication.objects.filter(job__id=job_id, job__recruiter=self.request.user)
