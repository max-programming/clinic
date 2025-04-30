import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patientService } from "./patient-service";
import { AddPatientRequest } from "../types/patient";

// Query key for patients
export const patientsKeys = {
  all: ["patients"] as const,
  details: (id: string) => ["patients", id] as const,
};

// Hook to fetch all patients
export function usePatients() {
  return useQuery({
    queryKey: patientsKeys.all,
    queryFn: patientService.getAllPatients,
  });
}

// Hook to fetch a patient by ID
export function usePatient(id: string) {
  return useQuery({
    queryKey: patientsKeys.details(id),
    queryFn: () => patientService.getPatientById(id),
    enabled: !!id,
  });
}

// Hook to delete a patient
export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientService.deletePatient(id),
    onSuccess: () => {
      // Invalidate patients query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
    },
  });
}

// Hook to add a patient
export function useAddPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddPatientRequest) => patientService.addPatient(data),
    onSuccess: () => {
      // Invalidate patients query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
    },
  });
}
