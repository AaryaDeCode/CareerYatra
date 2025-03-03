import React, { useEffect, useState, useContext } from "react";
import { fetchMyJobPosts, deleteJobPost } from "../../api/jobsApi";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const MyJobPosts = () => {
    const { token } = useContext(AuthContext);
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                const data = await fetchMyJobPosts(token);
                if (data.detail) {
                    setError(data.detail);
                } else {
                    setMyJobs(data);
                }
            } catch (err) {
                setError("Failed to load job posts.");
            } finally {
                setLoading(false);
            }
        };
        getMyJobs();
    }, [token]);

    const handleDelete = async (jobId) => {
        if (window.confirm("Are you sure you want to delete this job post?")) {
            try {
                await deleteJobPost(jobId, token);
                setMyJobs(myJobs.filter((job) => job.id !== jobId));
            } catch (err) {
                setError("Failed to delete job post.");
            }
        }
    };

    if (loading) return <p>Loading your job posts...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>My Job Posts</h2>
            <button onClick={() => navigate("/recruiter/jobs/new")}>Create New Job</button>
            <ul>
                {myJobs.length > 0 ? (
                    myJobs.map((job) => (
                        <li key={job.id}>
                            <h3 onClick={() => navigate(`/recruiter/jobs/${job.id}`)}>{job.title}</h3>
                            <p>{job.company_name}</p>
                            <p>Location: {job.location}</p>
                            <p>Due Date: {new Date(job.due_date).toLocaleDateString()}</p>
                            <button onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(job.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>You have not posted any jobs yet.</p>
                )}
            </ul>
        </div>
    );
};

export default MyJobPosts;
