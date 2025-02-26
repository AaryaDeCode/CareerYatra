import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CandidateDashboard from './components/Candidate/CandidateDashboard';
import RecruiterDashboard from './components/Recruiter/RecruiterDashboard';
import Profile from './components/Common/Profile';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  // Read saved auth info if available
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (role, token, username) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/register" component={Register} />
        <PrivateRoute
          path="/candidate/dashboard"
          component={CandidateDashboard}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          allowedRole="candidate"
          token={token}
          username={username}
        />
        <PrivateRoute
          path="/recruiter/dashboard"
          component={RecruiterDashboard}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          allowedRole="recruiter"
          token={token}
          username={username}
        />
        <PrivateRoute
          path="/profile"
          component={Profile}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          allowedRole={["candidate", "recruiter"]}
          token={token}
          username={username}
        />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
