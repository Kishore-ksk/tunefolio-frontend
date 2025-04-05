import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000', // Laravel backend URL
  withCredentials: true, // ✅ Must be true for Sanctum to send cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 👉 CSRF protection: First, hit Sanctum's CSRF cookie endpoint
API.get('/sanctum/csrf-cookie').catch((error) => {
  console.error("Failed to get CSRF cookie:", error);
});

// Add request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const userId = localStorage.getItem("userId");
    if (userId) {
      config.headers['User-Id'] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out...");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
