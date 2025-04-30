import { api } from "./api";
import { ApiResponse } from "../types/auth";
import {
  Patient,
  PatientDetail,
  AddPatientRequest,
  AddPatientResponse,
  UpdatePatientRequest,
  UpdatePatientResponse,
  UpdatePatientNotesRequest,
  DeletePatientResponse,
} from "../types/patient";

export const patientService = {
  getAllPatients: async (): Promise<Patient[]> => {
    const response = await api.get<ApiResponse<Patient[]>>("/patients");

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },

  getPatientById: async (id: string): Promise<PatientDetail> => {
    const response = await api.get<ApiResponse<PatientDetail>>(
      `/patients/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },

  addPatient: async (data: AddPatientRequest): Promise<AddPatientResponse> => {
    const response = await api.post<ApiResponse<AddPatientResponse>>(
      "/patients",
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },

  updatePatient: async (
    id: string,
    data: UpdatePatientRequest
  ): Promise<UpdatePatientResponse> => {
    const response = await api.put<ApiResponse<UpdatePatientResponse>>(
      `/patients/${id}`,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },

  updatePatientNotes: async (
    id: string,
    data: UpdatePatientNotesRequest
  ): Promise<UpdatePatientResponse> => {
    const response = await api.patch<ApiResponse<UpdatePatientResponse>>(
      `/patients/${id}/notes`,
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },

  deletePatient: async (id: string): Promise<DeletePatientResponse> => {
    const response = await api.delete<ApiResponse<DeletePatientResponse>>(
      `/patients/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },
};
