import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://browear-backend-updated.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/*

REQUEST INTERCEPTOR

*/

api.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("token");



  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  return config;
});

//RESPONSE INTERCEPTOR


api.interceptors.response.use(

  (response) => response,

  (error) => {
    return Promise.reject(error);
  }

);

export default api;