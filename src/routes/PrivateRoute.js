import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, userRole, allowedRole }) => {
  // Check if userRole is permitted
  const roleAllowed = Array.isArray(allowedRole)
    ? allowedRole.includes(userRole)
    : userRole === allowedRole;

  return isAuthenticated && roleAllowed ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
