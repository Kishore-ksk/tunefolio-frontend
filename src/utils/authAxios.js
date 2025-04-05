import axios from 'axios';

// This Axios instance is ONLY for authenticated requests
const AuthAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Laravel backend URL
  withCredentials: false, // ✅ Required for authentication (Sanctum)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default AuthAPI;
