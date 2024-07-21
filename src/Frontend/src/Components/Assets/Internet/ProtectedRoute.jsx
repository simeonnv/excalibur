import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from './internet';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await localStorage.getItem('token');
        console.log(token)
        const response = await axios.post('http://localhost:5000/checktoken', {token});
        if (response.data.isAuthenticated) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error('There was an error!', error);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  if (!auth || !isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;