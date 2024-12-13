"use client";

import React, { ReactNode } from "react";
import { useUser } from "@/app/context/UserContext"; // Ensure this path is correct

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { user } = useUser();

  if (!requiredRoles.includes(user.role) || user.role === "guest") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>You are explicitly denied access to this page.</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
