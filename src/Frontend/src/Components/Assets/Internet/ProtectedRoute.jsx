import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './internet';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;