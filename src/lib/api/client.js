import axios from "axios";

/* Axios 설정 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default client;
