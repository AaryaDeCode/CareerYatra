from django.urls import path
from .views import (
    AllJobPostsView,
    ApplyJobView,
    CandidateAppliedJobsView,
    WithdrawApplicationView
)

urlpatterns = [
    path("jobs/", AllJobPostsView.as_view(), name="all-job-posts"),
    path("apply/<int:job_id>/", ApplyJobView.as_view(), name="apply-job"),
    path("my-applications/", CandidateAppliedJobsView.as_view(), name="candidate-applied-jobs"),
    path("withdraw/<int:job_id>/", WithdrawApplicationView.as_view(), name="withdraw-application"),
]
