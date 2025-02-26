from django.urls import path
from .views import JobPostView, JobPostDetailView, JobApplicantsView, PublicJobPostView

urlpatterns = [
    path("jobs/", PublicJobPostView.as_view(), name="public-job-posts"),  # 🔹 Candidates see job posts
    path("my-post/", JobPostView.as_view(), name="recruiter-job-posts"),  # 🔹 Recruiter sees only their jobs
    path("jobs/<int:pk>/", JobPostDetailView.as_view(), name="job-detail"),
    path("jobs/<int:job_id>/applicants/", JobApplicantsView.as_view(), name="job-applicants"),
]
