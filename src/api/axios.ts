import axios from "axios";
import { useLoading } from "../app/stores/loaderStore";

const api = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (!config.headers?.["x-no-loader"]) {
      useLoading.getState().showLoading();
    }
    return config;
  },
  (error) => {
    useLoading.getState().hideLoading();
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    useLoading.getState().hideLoading();
    return response;
  },
  async (error) => {
    const request = error.config;

    if (error.response?.status !== 401 || request._retry) {
      useLoading.getState().hideLoading();
    }

    if (
      error.response?.status == 401 &&
      !request._retry &&
      !request.url?.includes("auth/refresh")
    ) {
      request._retry = true;

      try {
        await api.post("auth/refresh");
        return api(request);
      } catch (refreshErr) {
        useLoading.getState().hideLoading();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
