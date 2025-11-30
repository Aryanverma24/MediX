import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true, // This is important for sending cookies
});

// Add a request interceptor to include the token in every request
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;