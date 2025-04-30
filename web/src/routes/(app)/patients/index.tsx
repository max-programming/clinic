import { PatientsTable } from "@/components/patients-table";
// import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/(app)/patients/")({
  beforeLoad: async () => {
    // Redirect to login if not authenticated
    return await requireAuth();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container py-10 mx-auto">
      {/* <Breadcrumb items={[{ label: "Patients" }]} /> */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button asChild>
          <Link to="/patients/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Patient
          </Link>
        </Button>
      </div>

      <PatientsTable />
    </div>
  );
}
