import axios from "axios";
import { ShowSwalMsg } from "utility/swal";

const apiInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

apiInterceptor.interceptors.request.use(
  (config) => config,
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
apiInterceptor.interceptors.response.use(undefined, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  ShowSwalMsg("error", error.message);
  return Promise.reject(error);
});

export default apiInterceptor;

export function apiResponseHandler(response, error) {
  if (response && response.data) {
    return response.data;
  } else {
    ShowSwalMsg("error", error?.message, "LUND");
    return false;
  }
}
