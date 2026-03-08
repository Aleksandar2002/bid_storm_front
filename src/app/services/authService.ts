import api from "../../api/axios";
import type { RegistrationFormType } from "../../features/Auth/formData/registerData";

export const login = async (email: string, password: string) => {
  return await api.post("/auth/login", {
    email: email,
    password: password,
  });
};

export const register = async (data: RegistrationFormType) => {
  return await api.post("/users/register", data);
};

export const getUserData = async () => {
  return await api.get("/auth/me");
};

export const verifyAccessCode = async (code: string) => {
  return await api.post("users/verifyAccessCode", { accessCode: code });
};

export const logout = async () => {
  return await api.delete("auth/logout");
};
