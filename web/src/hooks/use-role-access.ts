import { useState, useEffect } from "react";
import { authService } from "@/lib/auth-service";
import { UserResponseData } from "@/types/auth";

export function useRoleAccess(allowedRoles?: ("doctor" | "receptionist")[]) {
  const [currentUser, setCurrentUser] = useState<UserResponseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const hasAccess = !allowedRoles
    ? !!currentUser
    : currentUser
      ? allowedRoles.includes(currentUser.role as "doctor" | "receptionist")
      : false;

  const isDoctor = currentUser?.role === "doctor";
  const isReceptionist = currentUser?.role === "receptionist";

  return {
    loading,
    currentUser,
    hasAccess,
    isDoctor,
    isReceptionist,
  };
}
