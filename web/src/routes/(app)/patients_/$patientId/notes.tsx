import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/ui/loading";
import { usePatient, useUpdatePatientNotes } from "@/lib/usePatients";

export const Route = createFileRoute("/(app)/patients_/$patientId/notes")({
  component: UpdateNotesPage,
});

const formSchema = z.object({
  medicalNotes: z.string().optional(),
});

function UpdateNotesPage() {
  const { patientId } = Route.useParams();
  const navigate = useNavigate();
  const { data: patient, isLoading, isError } = usePatient(patientId);
  const updateNotesMutation = useUpdatePatientNotes();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicalNotes: "",
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset({
        medicalNotes: patient.medicalNotes || "",
      });
    }
  }, [patient, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(null);
      await updateNotesMutation.mutateAsync({
        id: patientId,
        notes: values.medicalNotes || "",
      });
      navigate({ to: "/patients/$patientId", params: { patientId } });
    } catch (error) {
      console.error("Failed to update patient notes:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update notes. Please try again."
      );
    }
  }

  if (isLoading) {
    return <Loading text="Loading patient data..." className="py-10" />;
  }

  if (isError || !patient) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Patient Not Found</h2>
        <p className="mb-6">
          The patient you're looking for doesn't exist or you don't have
          permission to update their notes.
        </p>
        <Button asChild>
          <Link to="/">Back to Patients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/patients/$patientId" params={{ patientId }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patient Details
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Update Medical Notes</h1>
        <h2 className="text-xl mb-6">Patient: {patient.name}</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="medicalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Notes</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter detailed medical notes for this patient"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/patients/$patientId" params={{ patientId }}>
                  Cancel
                </Link>
              </Button>
              <Button type="submit" disabled={updateNotesMutation.isPending}>
                {updateNotesMutation.isPending ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
