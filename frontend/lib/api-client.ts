import { COOKIE_TOKEN_KEY, NEXT_PUBLIC_BASE_URL_API } from "@/config";
import Cookies from "js-cookie";
import axios from "axios";

const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(COOKIE_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
