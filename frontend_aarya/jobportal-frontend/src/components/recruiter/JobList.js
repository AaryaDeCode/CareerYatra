import React, { useEffect, useState, useContext } from "react";
import { fetchAllJobs } from "../../api/jobsApi";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const JobList = () => {
    const { token } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getJobs = async () => {
            try {
                const data = await fetchAllJobs(token);
                if (data.detail) {
                    setError(data.detail);
                } else {
                    setJobs(data);
                }
            } catch (err) {
                setError("Failed to load jobs.");
            } finally {
                setLoading(false);
            }
        };
        getJobs();
    }, [token]);

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>All Job Posts</h2>
            <ul>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <li key={job.id} onClick={() => navigate(`/recruiter/jobs/${job.id}`)}>
                            <h3>{job.title}</h3>
                            <p>{job.company_name}</p>
                            <p>Location: {job.location}</p>
                            <p>Due Date: {new Date(job.due_date).toLocaleDateString()}</p>
                        </li>
                    ))
                ) : (
                    <p>No job posts available.</p>
                )}
            </ul>
        </div>
    );
};

export default JobList;
