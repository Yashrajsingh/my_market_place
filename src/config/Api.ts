import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5454";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  // Don't clobber an Authorization header a caller already set
  // (e.g. customer requests explicitly attach the user's own jwt).
  if (!config.headers.Authorization) {
    const jwt = localStorage.getItem("seller_jwt");

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  }

  return config;
});