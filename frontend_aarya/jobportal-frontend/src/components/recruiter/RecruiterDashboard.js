// src/components/recruiter/RecruiterDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { user, refreshAccessToken } = useAuth();

  const fetchJobs = async () => {
    let token = sessionStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found. Refreshing...");
      await refreshAccessToken();
      token = sessionStorage.getItem("access_token"); // Get the new token
    }

    if (!token) {
      console.error("Token refresh failed.");
      return;
    }

    try {
      const res = await axios.get("/recruiter/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Recruiter Dashboard</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;
