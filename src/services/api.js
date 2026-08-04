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

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },

  (error) => Promise.reject(error)

);

/*
=========================================
RESPONSE INTERCEPTOR
=========================================
*/

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("otpAccess");
      localStorage.removeItem("personalAccess");

      toast.error("Session expired. Please login again.");

      if (
        window.location.pathname !== "/login"
      ) {

        window.location.href = "/login";

      }

    }

    return Promise.reject(error);

  }

);

export default api;