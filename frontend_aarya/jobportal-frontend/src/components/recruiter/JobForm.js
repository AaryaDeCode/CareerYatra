import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createJobPost, updateJobPost, fetchJobDetail } from "../../api/jobsApi";
import { AuthContext } from "../../utils/AuthContext";

const JobForm = () => {
    const { jobId } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [jobData, setJobData] = useState({
        title: "",
        description: "",
        company_name: "",
        location: "",
        salary: "",
        due_date: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (jobId) {
            const fetchJob = async () => {
                try {
                    const job = await fetchJobDetail(jobId, token);
                    setJobData({
                        title: job.title,
                        description: job.description,
                        company_name: job.company_name,
                        location: job.location,
                        salary: job.salary,
                        due_date: job.due_date.split("T")[0], // Extract date part
                    });
                } catch (err) {
                    setError("Failed to load job details.");
                }
            };
            fetchJob();
        }
    }, [jobId, token]);

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (jobId) {
                await updateJobPost(jobId, jobData, token);
            } else {
                await createJobPost(jobData, token);
            }
            navigate("/recruiter/my-posts");
        } catch (err) {
            setError("Failed to submit job post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{jobId ? "Edit Job Post" : "Create Job Post"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={jobData.title} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={jobData.description} onChange={handleChange} required />

                <label>Company Name:</label>
                <input type="text" name="company_name" value={jobData.company_name} onChange={handleChange} required />

                <label>Location:</label>
                <input type="text" name="location" value={jobData.location} onChange={handleChange} required />

                <label>Salary:</label>
                <input type="number" name="salary" value={jobData.salary} onChange={handleChange} required />

                <label>Due Date:</label>
                <input type="date" name="due_date" value={jobData.due_date} onChange={handleChange} required />

                <button type="submit" disabled={loading}>{loading ? "Submitting..." : jobId ? "Update" : "Create"}</button>
            </form>
            <button onClick={() => navigate("/recruiter/my-posts")}>Cancel</button>
        </div>
    );
};

export default JobForm;
