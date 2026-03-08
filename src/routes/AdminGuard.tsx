import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../app/stores/authStore";

function GuestGuard() {
  const user = useAuthStore((state) => state.user);

  if (!user?.isSuperAdmin || user.role != "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default GuestGuard;
