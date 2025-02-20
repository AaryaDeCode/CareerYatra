from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from jobs.models import JobPost, JobApplication
from jobs.serializers import JobPostSerializer, JobApplicationSerializer
from rest_framework.permissions import IsAuthenticated

# Permission for Candidates Only
class IsCandidate(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == "candidate"

# 🔹 1. Candidate can view all job posts
class AllJobPostsView(generics.ListAPIView):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    permission_classes = [IsAuthenticated, IsCandidate]

# 🔹 2. Candidate can apply for a job
class ApplyJobView(generics.CreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated, IsCandidate]

    def perform_create(self, serializer):
        job_id = self.kwargs["job_id"]
        job = JobPost.objects.get(id=job_id)

        # Prevent duplicate applications
        if JobApplication.objects.filter(job=job, candidate=self.request.user).exists():
            return Response({"error": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(candidate=self.request.user, job=job)

# 🔹 3. Candidate can view their applied jobs
class CandidateAppliedJobsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated, IsCandidate]

    def get_queryset(self):
        return JobApplication.objects.filter(candidate=self.request.user)

# 🔹 4. Candidate can withdraw (undo) an application
class WithdrawApplicationView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsCandidate]

    def delete(self, request, job_id, *args, **kwargs):
        try:
            application = JobApplication.objects.get(job_id=job_id, candidate=request.user)
            application.delete()
            return Response({"message": "Application withdrawn successfully."}, status=status.HTTP_204_NO_CONTENT)
        except JobApplication.DoesNotExist:
            return Response({"error": "No application found for this job."}, status=status.HTTP_404_NOT_FOUND)
