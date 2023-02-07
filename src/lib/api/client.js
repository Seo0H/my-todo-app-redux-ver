import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  if (!config.headers && config.headers) return config;
  const token = localStorage.getItem("access_token");

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;