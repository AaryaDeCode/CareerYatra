import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, userRole, allowedRole, token, username, ...rest }) => {
  const roleAllowed = Array.isArray(allowedRole)
    ? allowedRole.includes(userRole)
    : allowedRole === userRole;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && roleAllowed ? (
          <Component {...props} token={token} username={username} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
