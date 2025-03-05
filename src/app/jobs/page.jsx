"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import "@/styles.css"; // Import the global CSS file

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="jobs-container">
      <h2>Available Jobs</h2>
      {jobs.length ? (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <small>
              {job.company} – {job.location}
            </small>
          </div>
        ))
      ) : (
        <p className="no-jobs">No jobs available.</p>
      )}
    </main>
  );
}
