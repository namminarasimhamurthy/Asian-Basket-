// src/lib/axios.ts - MUST HAVE THIS EXACTLY
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000,
});

// ✅ REQUEST INTERCEPTOR - ADDS TOKEN AUTOMATICALLY
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    console.log("🔑 Sending token:", !!token ? "YES" : "NO"); // DEBUG
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR - LOGS ERRORS
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API ERROR:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
