import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000', // Laravel backend URL
  withCredentials: false, // Allows sending cookies with requests (for Sanctum auth)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const userId = localStorage.getItem("userId"); // Get userId from storage
    if (userId) {
      config.headers['User-Id'] = userId; // Attach userId to requests
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor (Handle expired tokens)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.warn("Session expired. Logging out...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
export default API;

