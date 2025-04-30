export interface PatientUser {
  id: string;
  username: string;
  role: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  address?: string;
  phone?: string;
  medicalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientDetail extends Patient {
  createdBy: PatientUser;
  updatedBy: PatientUser;
}

export interface AddPatientRequest {
  name: string;
  age: number;
  gender: string;
  address?: string;
  phone?: string;
}

export interface AddPatientResponse {
  id: string;
  createdBy: string;
  createdAt: string;
}

export interface UpdatePatientRequest {
  name?: string;
  age?: number;
  gender?: string;
  address?: string;
  phone?: string;
  medicalNotes?: string;
}

export interface UpdatePatientResponse {
  id: string;
  updatedBy: string;
  updatedAt: string;
}

export interface UpdatePatientNotesRequest {
  medicalNotes: string;
}

export interface DeletePatientResponse {
  success: boolean;
  message?: string;
}
