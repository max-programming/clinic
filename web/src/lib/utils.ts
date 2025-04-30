import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Patient, PatientFormData } from "./types";
import { mockPatients } from "./mock-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString();
}

export function truncateText(text: string, maxLength = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Mock API functions
let patients = [...mockPatients];

export async function getPatients(): Promise<Patient[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...patients];
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return patients.find(patient => patient.id === id);
}

export async function addPatient(
  patientData: PatientFormData
): Promise<Patient> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const now = new Date().toISOString();
  const newPatient: Patient = {
    id: `P${String(patients.length + 1).padStart(3, "0")}`,
    ...patientData,
    createdAt: now,
    updatedAt: now,
    createdBy: "Current User", // In a real app, this would be the authenticated user
    updatedBy: "Current User",
  };

  patients = [...patients, newPatient];
  return newPatient;
}

export async function updatePatient(
  id: string,
  patientData: Partial<PatientFormData>
): Promise<Patient> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const patientIndex = patients.findIndex(patient => patient.id === id);
  if (patientIndex === -1) {
    throw new Error("Patient not found");
  }

  const updatedPatient: Patient = {
    ...patients[patientIndex],
    ...patientData,
    updatedAt: new Date().toISOString(),
    updatedBy: "Current User", // In a real app, this would be the authenticated user
  };

  patients = [
    ...patients.slice(0, patientIndex),
    updatedPatient,
    ...patients.slice(patientIndex + 1),
  ];

  return updatedPatient;
}

export async function deletePatient(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  patients = patients.filter(patient => patient.id !== id);
}

export async function updateMedicalNotes(
  id: string,
  notes: string
): Promise<Patient> {
  return updatePatient(id, { medicalNotes: notes });
}
