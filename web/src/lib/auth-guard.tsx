import { Navigate, redirect } from "@tanstack/react-router";
import { authService } from "@/lib/auth-service";
import { UserResponseData } from "../types/auth";
import React from "react";

export async function requireAuth() {
  if (!authService.isAuthenticated()) {
    throw redirect({
      to: "/login",
      search: {
        redirect: window.location.pathname,
      },
    });
  }
  return {};
}

export function useRedirectAuthenticated() {
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/patients" />;
  }

  return null;
}

export async function requireRole(role: "doctor" | "receptionist") {
  if (!authService.isAuthenticated()) {
    throw redirect({
      to: "/login",
      search: {
        redirect: window.location.pathname,
      },
    });
  }

  const currentUser = await authService.getCurrentUser();

  if (!currentUser || currentUser.role !== role) {
    throw redirect({
      to: "/patients",
    });
  }

  return { user: currentUser };
}

export async function requireDoctor() {
  return requireRole("doctor");
}

export async function requireReceptionist() {
  return requireRole("receptionist");
}

export function useRoleCheck(allowedRoles: ("doctor" | "receptionist")[]) {
  const [user, setUser] = React.useState<UserResponseData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return true;

  if (!user) return false;

  return allowedRoles.includes(user.role as "doctor" | "receptionist");
}
