import React, { useState } from 'react';

const CandidateRanking = () => {
  // Dummy candidate data – replace with your API data as needed.
  const initialCandidates = [
    { id: 1, name: "Alice Johnson", relevance: 80, experience: 5, performance: 85, education: 90 },
    { id: 2, name: "Bob Smith", relevance: 70, experience: 3, performance: 75, education: 80 },
    { id: 3, name: "Charlie Brown", relevance: 90, experience: 8, performance: 95, education: 85 },
    { id: 4, name: "Diana Prince", relevance: 85, experience: 4, performance: 80, education: 70 },
  ];

  const [sortParam, setSortParam] = useState("relevance");

  // Sort the candidates in descending order based on the chosen parameter.
  const sortedCandidates = [...initialCandidates].sort((a, b) => b[sortParam] - a[sortParam]);

  return (
    <div className="dashboard-container">
      <h2>Candidate Rankings</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="sort">Sort By: </label>
        <select 
          id="sort" 
          value={sortParam} 
          onChange={(e) => setSortParam(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="experience">Experience</option>
          <option value="performance">Performance</option>
          <option value="education">Education</option>
        </select>
      </div>
      <ul className="job-list">
        {sortedCandidates.map(candidate => (
          <li key={candidate.id} className="job-item">
            <h4>{candidate.name}</h4>
            <p>Relevance: {candidate.relevance}</p>
            <p>Experience: {candidate.experience} years</p>
            <p>Performance: {candidate.performance}</p>
            <p>Education: {candidate.education}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateRanking;
