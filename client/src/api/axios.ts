import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  // Do not set a global Content-Type; let axios/browser set it per-request (FormData needs multipart).
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
