// axiosConfig.js
import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access'); // Retrieve the auth token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Clear tokens if unauthorized
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        console.log('Unauthorized, redirecting to login...');
        // Optional: redirect to login page if using a router or trigger an event
        window.location.href = '/login'; // Adjust this based on your routing setup
      } else {
        console.error(`Error: ${error.response.status} - ${error.response.data}`);
      }
    } else {
      console.error('Network or server error', error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
