from django.db import models
from users.models import CustomUser

from django.db import models
from django.utils.timezone import now


class JobPost(models.Model):
    recruiter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'user_type': 'recruiter'})
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=50, null=True, blank=True)
    company_name = models.CharField(max_length=255)  # ✅ Allows company_name to be optional
    due_date = models.DateTimeField(null=True, blank=True)  # ✅ Allows due_date to be empty

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name="applications")
    candidate = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'user_type': 'candidate'})
    resume = models.FileField(upload_to="resumes/")
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidate.username} applied for {self.job.title}"
