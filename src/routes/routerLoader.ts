import { useAuthStore } from "../app/stores/authStore";
import { getAndSetLoggedUser } from "../shared/utils/authHelper";

export const routerLoader = async () => {
  const { user, removeUser } = useAuthStore.getState();

  if (user) return null;

  try {
    await getAndSetLoggedUser();
  } catch (err: unknown) {
    console.log(err);
    removeUser();
  }
  return null;
};
