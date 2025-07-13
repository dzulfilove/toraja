import axios from "axios";

const API = axios.create({
  baseURL: "https://toraja-tbbec3faqq-uc.a.run.app/api",
});

// Interceptor → tambahkan token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
