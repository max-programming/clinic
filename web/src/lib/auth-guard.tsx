import { Navigate, redirect } from "@tanstack/react-router";
import { authService } from "@/lib/auth-service";

// Redirect to login if not authenticated
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

// Redirect to patients page if already authenticated
export function useRedirectAuthenticated() {
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/patients" />;
  }

  return null;
}
