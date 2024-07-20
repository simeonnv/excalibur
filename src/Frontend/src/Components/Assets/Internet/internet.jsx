import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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