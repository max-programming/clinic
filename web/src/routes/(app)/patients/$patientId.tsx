import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { useDeletePatient, usePatient } from "@/lib/usePatients";
import { formatDate } from "@/lib/utils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Edit, FileEdit, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(app)/patients/$patientId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { patientId } = Route.useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: patient, isLoading, isError } = usePatient(patientId);

  const deleteMutation = useDeletePatient();

  async function handleDelete() {
    if (!patient) return;

    try {
      await deleteMutation.mutateAsync(patient.id);
      setDeleteDialogOpen(false);
      navigate({ to: "/patients" });
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  }

  if (isLoading) {
    return <Loading text="Loading patient data..." className="py-10" />;
  }

  if (isError || !patient) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Patient Not Found</h2>
        <p className="mb-6">
          The patient you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <Button asChild>
          <Link to="/patients">Back to Patients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {/* <Breadcrumb items={[{ label: "Patients", href: "/patients" }, { label: patient.name }]} /> */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/patients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Details</CardTitle>
          <CardDescription>
            View detailed information about {patient.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
              <p>{patient.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Name
              </h3>
              <p>{patient.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
              <p>{patient.age}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Gender
              </h3>
              <p>{patient.gender}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Address
              </h3>
              <p>{patient.address || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Phone
              </h3>
              <p>{patient.phone || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Created At
              </h3>
              <p>{formatDate(patient.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Updated At
              </h3>
              <p>{formatDate(patient.updatedAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Created By
              </h3>
              <p>{patient.createdBy.username}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Updated By
              </h3>
              <p>{patient.updatedBy.username}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Medical Notes
            </h3>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
              {patient.medicalNotes || "No medical notes available."}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link
                to="/patients/$patientId/edit"
                params={{ patientId: patient.id }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Patient
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link
                to="/patients/$patientId/notes"
                params={{ patientId: patient.id }}
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Update Notes
              </Link>
            </Button>
          </div>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Patient
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              patient record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
