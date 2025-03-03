import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplicants } from "../../api/jobsApi";
import { AuthContext } from "../../utils/AuthContext";

const Applicants = () => {
    const { jobId } = useParams();
    const { token } = useContext(AuthContext);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getApplicants = async () => {
            try {
                const data = await fetchApplicants(jobId, token);
                if (data.detail) {
                    setError(data.detail);
                } else {
                    setApplicants(data);
                }
            } catch (err) {
                setError("Failed to load applicants.");
            } finally {
                setLoading(false);
            }
        };
        getApplicants();
    }, [jobId, token]);

    if (loading) return <p>Loading applicants...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (applicants.length === 0) return <p>No applicants yet.</p>;

    return (
        <div>
            <h2>Applicants for Job #{jobId}</h2>
            <ul>
                {applicants.map((applicant) => (
                    <li key={applicant.id}>
                        <p><strong>Name:</strong> {applicant.candidate_name}</p>
                        <p><strong>Email:</strong> {applicant.candidate_email}</p>
                        <p><strong>Resume:</strong> <a href={applicant.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(`/recruiter/jobs/${jobId}`)}>Back to Job Details</button>
        </div>
    );
};

export default Applicants;
