import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../app/stores/authStore";

function AdminGuard() {
  const user = useAuthStore((state) => state.user);
  if (user?.isSuperAdmin || user?.role == "Admin") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default AdminGuard;
