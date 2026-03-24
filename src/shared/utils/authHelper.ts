import type { NavigateFunction } from "react-router";
import { getUserData } from "../../app/services/authService";
import { useAuthStore } from "../../app/stores/authStore";

export const handleSuccessfulLogin = async (
  setToast: (s: string) => void,
  navigate: NavigateFunction,
) => {
  await getAndSetLoggedUser();
  setToast("Login is successful");
  navigate("/");
};

export const getAndSetLoggedUser = async () => {
  const meResponse = await getUserData();

  const setUser = useAuthStore.getState().setUser;
  setUser({
    id: meResponse.data.id,
    name: meResponse.data.fullName,
    isSuperAdmin: meResponse.data.isSuperAdmin,
    email: meResponse.data.email,
    role: meResponse.data.roleName,
    allowedUseCases: meResponse.data.allowedUseCases,
  });
};
