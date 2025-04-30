import { PatientsTable } from "@/components/patients-table";
// import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, PlusCircle } from "lucide-react";
import { requireAuth } from "@/lib/auth-guard";
import { useState, useEffect } from "react";
import { authService } from "@/lib/auth-service";
import { UserResponseData } from "@/types/auth";

export const Route = createFileRoute("/(app)/patients/")({
  beforeLoad: async () => {
    return await requireAuth();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [currentUser, setCurrentUser] = useState<UserResponseData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const isReceptionist = currentUser?.role === "receptionist";

  const handleLogout = () => {
    authService.logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="container py-10 mx-auto">
      {/* <Breadcrumb items={[{ label: "Patients" }]} /> */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <div className="flex gap-4">
          {isReceptionist && (
            <Button asChild>
              <Link to="/patients/add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Patient
              </Link>
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <PatientsTable />
    </div>
  );
}
