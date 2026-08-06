import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
=========================================
REQUEST INTERCEPTOR
=========================================
*/

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  console.log("Request URL:", config.url);
  console.log("Token:", token);
  console.log("Authorization Before:", config.headers.Authorization);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Authorization After:", config.headers.Authorization);

  return config;
});

/*
=========================================
RESPONSE INTERCEPTOR
=========================================
*/

api.interceptors.response.use(

  (response) => response,

  (error) => {
    return Promise.reject(error);
  }

);

export default api;