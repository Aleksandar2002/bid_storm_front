import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
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
        return Promise.reject(refreshErr);
      }
    }
  },
);

export default api;
