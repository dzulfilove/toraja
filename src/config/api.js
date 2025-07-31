import axios from "axios";

const API = axios.create({
  baseURL:
    "https://asia-southeast2-the-fulcrum-467402-d8.cloudfunctions.net/toraja/api",
});

// Interceptor → tambahkan token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
