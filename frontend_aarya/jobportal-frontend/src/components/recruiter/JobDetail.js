import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobDetail, deleteJobPost } from "../../api/jobsApi";
import { AuthContext } from "../../utils/AuthContext";

const JobDetail = () => {
    const { jobId } = useParams();
    const { token } = useContext(AuthContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getJobDetail = async () => {
            try {
                const data = await fetchJobDetail(jobId, token);
                if (data.detail) {
                    setError(data.detail);
                } else {
                    setJob(data);
                }
            } catch (err) {
                setError("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };
        getJobDetail();
    }, [jobId, token]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job post?")) {
            try {
                await deleteJobPost(jobId, token);
                navigate("/recruiter/my-posts");
            } catch (err) {
                setError("Failed to delete job post.");
            }
        }
    };

    if (loading) return <p>Loading job details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!job) return <p>Job post not found.</p>;

    return (
        <div>
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company_name}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Due Date:</strong> {new Date(job.due_date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {job.description}</p>

            <button onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate(`/recruiter/jobs/${job.id}/applicants`)}>View Applicants</button>
            <button onClick={() => navigate("/recruiter/my-posts")}>Back to My Posts</button>
        </div>
    );
};

export default JobDetail;
