import React from 'react';
import { Navigate } from 'react-router-dom';

// allowedRoles: array of roles allowed to access this route
const ProtectedRoute = ({ allowedRoles, children }) => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    // Not logged in, redirect to auth page
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(userStr);
  const userRole = user.role?.toLowerCase();

  if (!allowedRoles.includes(userRole)) {
    // Logged in but not authorized for this page
    return <Navigate to="/" replace />;
  }

  // Allowed — render children (dashboard)
  return children;
};

export default ProtectedRoute;
