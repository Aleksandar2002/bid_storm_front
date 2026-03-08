import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../app/stores/authStore";

function AuthGuard() {
  const user = useAuthStore((set) => set.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default AuthGuard;
