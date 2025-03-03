const API_BASE_URL = "http://localhost:8000"; // Update if your backend URL is different

// Fetch all job posts (Recruiters can't apply)
export const fetchAllJobs = async (token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

// Fetch recruiter's own job posts
export const fetchMyJobPosts = async (token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/my-post`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

// Fetch job post details
export const fetchJobDetail = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

// Fetch applicants for a specific job post
export const fetchJobApplicants = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/jobs/${jobId}/applicants`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

// Create a new job post
export const createJobPost = async (jobData, token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/my-posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
    });
    return response.json();
};

// Update a job post
export const updateJobPost = async (jobId, jobData, token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
    });
    return response.json();
};

// Delete a job post
export const deleteJobPost = async (jobId, token) => {
    const response = await fetch(`${API_BASE_URL}/recruiter/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};
