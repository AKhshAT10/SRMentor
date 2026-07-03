import axios from 'axios';

// In development we talk to the local backend. In production we default to the
// same origin (monolith deploy), but VITE_API_BASE_URL lets you point the
// frontend at a separately hosted backend for a split deployment.
const PROD_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development"
        ? "http://localhost:5001/api"
        : `${PROD_BASE}/api`,
    withCredentials: true,
});
