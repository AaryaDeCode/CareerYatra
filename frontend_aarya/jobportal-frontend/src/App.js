import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import { PrivateRoute } from "./utils/PrivateRoute";
import "./App.css";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Recruiter Components
import RecruiterDashboard from "./components/recruiter/RecruiterDashboard";

// ✅ Move inline component definitions **below** imports
const AdminDashboard = () => <div className="page-container">Admin Dashboard</div>;
const JobsPage = () => <div className="page-container">Jobs Page for Recruiters</div>;
const MyPostsPage = () => <div className="page-container">My Posts for Recruiters</div>;
const RecruiterJobDetailPage = () => <div className="page-container">Recruiter Job Detail Page</div>;
const RecruiterApplicantsPage = () => <div className="page-container">Recruiter Applicants Page</div>;
const CandidateJobsPage = () => <div className="page-container">Jobs Page for Candidates</div>;
const CandidateApplyPage = () => <div className="page-container">Apply for Job Page</div>;
const CandidateMyApplicationsPage = () => <div className="page-container">My Applications Page</div>;
const CandidateWithdrawPage = () => <div className="page-container">Withdraw Application Page</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/auth/login" />} />

            {/* Superuser (Admin) Route */}
            <Route element={<PrivateRoute userType="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Recruiter Routes */}
            <Route element={<PrivateRoute userType="recruiter" />}>
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/jobs" element={<JobsPage />} />
              <Route path="/recruiter/my-posts" element={<MyPostsPage />} />
              <Route path="/recruiter/jobs/:id" element={<RecruiterJobDetailPage />} />
              <Route path="/recruiter/jobs/:id/applicants" element={<RecruiterApplicantsPage />} />
            </Route>

            {/* Candidate Routes */}
            <Route element={<PrivateRoute userType="candidate" />}>
              <Route path="/candidates/jobs" element={<CandidateJobsPage />} />
              <Route path="/candidates/apply/:id" element={<CandidateApplyPage />} />
              <Route path="/candidates/my-applications" element={<CandidateMyApplicationsPage />} />
              <Route path="/candidates/withdraw/:id" element={<CandidateWithdrawPage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
