export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  address: string;
  phone: string;
  medicalNotes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};

export type PatientFormData = Omit<
  Patient,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
>;
