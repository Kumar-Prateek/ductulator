import axios from "axios";
import { ShowSwalMsg } from "utility/swal";

const formDataInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

formDataInterceptor.interceptors.request.use(
  (config) => config,
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
formDataInterceptor.interceptors.response.use(undefined, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  ShowSwalMsg("error", error.message);
  return Promise.reject(error);
});

export default formDataInterceptor;
