import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patientService } from "./patient-service";
import { AddPatientRequest, UpdatePatientRequest } from "../types/patient";

export const patientsKeys = {
  all: ["patients"] as const,
  details: (id: string) => ["patients", id] as const,
};

export function usePatients() {
  return useQuery({
    queryKey: patientsKeys.all,
    queryFn: patientService.getAllPatients,
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: patientsKeys.details(id),
    queryFn: () => patientService.getPatientById(id),
    enabled: !!id,
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientService.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
    },
  });
}

export function useAddPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddPatientRequest) => patientService.addPatient(data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
      queryClient.setQueryData(patientsKeys.details(data.id), data);
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatientRequest }) =>
      patientService.updatePatient(id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
      queryClient.invalidateQueries({
        queryKey: patientsKeys.details(data.id),
      });
    },
  });
}

export function useUpdatePatientNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      patientService.updatePatientNotes(id, { medicalNotes: notes }),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: patientsKeys.all });
      queryClient.invalidateQueries({
        queryKey: patientsKeys.details(data.id),
      });
    },
  });
}
