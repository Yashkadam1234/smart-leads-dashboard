import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import Spinner
from "../ui/Spinner";

import type {
  UserRole,
} from "@shared/index";

interface Props {
  children:
    React.ReactNode;

  role?: UserRole;
}

export default function ProtectedRoute({
  children,
  role,
}: Props) {
  const {
    isAuthenticated,
    isLoading,
    user,
  } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (
    !isAuthenticated
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    role &&
    user?.role !== role
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}