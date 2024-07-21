import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getProtectedData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};