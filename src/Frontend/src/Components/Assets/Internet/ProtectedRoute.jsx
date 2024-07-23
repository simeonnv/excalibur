import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from './internet';

const ProtectedRoute = ({ endpoint, roleRedirects, children }) => {
  const [auth, setAuth] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.post(`http://localhost:5000/${endpoint}`, { token });
        console.log(response);
        if (response.data.isAuthenticated) {
          setAuth(true);
          setUserRole(response.data.role);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error('There was an error!', error);
        setAuth(false);
      }
    };

    checkAuth();
  }, [endpoint]);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  if (!auth || !isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roleRedirects && userRole && roleRedirects[userRole]) {
    return <Navigate to={roleRedirects[userRole]} />;
  }

  return children;
};

export default ProtectedRoute;
