import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "@/components/ui/loading";
import { usePatient, useUpdatePatient } from "@/lib/usePatients";
import { authService } from "@/lib/auth-service";

// Define a constant for the storage key
const PREV_PAGE_KEY = "clinic_prev_page";

export const Route = createFileRoute("/(app)/patients_/$patientId/edit")({
  component: EditPatientPage,
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce.number().int().positive({
    message: "Age must be a positive number.",
  }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender.",
  }),
  address: z.string().optional(),
  phone: z.string().optional(),
  medicalNotes: z.string().optional(),
});

function EditPatientPage() {
  const { patientId } = Route.useParams();
  const navigate = useNavigate();
  const { data: patient, isLoading, isError } = usePatient(patientId);
  const updatePatientMutation = useUpdatePatient();
  const [error, setError] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string>("details");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: undefined,
      address: "",
      phone: "",
      medicalNotes: "",
    },
  });

  useEffect(() => {
    // Get the previous page from localStorage on component mount
    const storedPrevPage = localStorage.getItem(PREV_PAGE_KEY);
    if (storedPrevPage === "list") {
      setPreviousPage("list");
    } else {
      setPreviousPage("details");
    }
  }, []);

  useEffect(() => {
    if (patient) {
      form.reset({
        name: patient.name,
        age: patient.age,
        gender: patient.gender as "Male" | "Female",
        address: patient.address || "",
        phone: patient.phone || "",
        medicalNotes: patient.medicalNotes || "",
      });
    }
  }, [patient, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError(null);
      await updatePatientMutation.mutateAsync({
        id: patientId,
        data: values,
      });
      navigate({ to: "/patients/$patientId", params: { patientId } });
    } catch (error) {
      console.error("Failed to update patient:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update patient. Please try again."
      );
    }
  }

  const handleLogout = () => {
    authService.logout();
    navigate({ to: "/login" });
  };

  const handleBack = () => {
    if (previousPage === "list") {
      navigate({ to: "/patients" });
    } else {
      navigate({ to: "/patients/$patientId", params: { patientId } });
    }
  };

  if (isLoading) {
    return <Loading text="Loading patient data..." className="py-10" />;
  }

  if (isError || !patient) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Patient Not Found</h2>
        <p className="mb-6">
          The patient you're looking for doesn't exist or you don't have
          permission to edit it.
        </p>
        <Button asChild>
          <Link to="/patients">Back to Patients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {previousPage === "list"
            ? "Back to Patients"
            : "Back to Patient Details"}
        </Button>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Patient</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Notes</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={updatePatientMutation.isPending}>
                {updatePatientMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
