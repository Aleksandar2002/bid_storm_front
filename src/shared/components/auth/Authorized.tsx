import React, { type ReactNode } from "react";
import { useAuthStore } from "../../../app/stores/authStore";
import type { UseCaseId } from "../../../app/Enums/UseCases";

type AuthorizedProps = {
  useCaseId?: UseCaseId;
  role?: string;
  fallback?: ReactNode;
  children?: ReactNode;
};

const Authorized = ({
  useCaseId,
  role,
  fallback,
  children,
}: AuthorizedProps) => {
  const user = useAuthStore((state) => state.user);

  if (user == null) return <>{fallback}</>;

  if (!useCaseId && !role) {
    return <>{children}</>;
  }

  const isSuperAdmin = user.isSuperAdmin;
  const areRolesTheSame = user.role == role;
  const isUseCaseAllowed =
    useCaseId && user.allowedUseCases.includes(useCaseId);

  if (isSuperAdmin || areRolesTheSame || isUseCaseAllowed) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default Authorized;
