import type { Patient } from "./types";

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    address: "123 Main St, Anytown, CA 12345",
    phone: "(555) 123-4567",
    medicalNotes:
      "Patient has a history of hypertension. Regular check-ups recommended every 3 months.",
    createdAt: "2023-01-15T09:30:00Z",
    updatedAt: "2023-03-20T14:15:00Z",
    createdBy: "Dr. Johnson",
    updatedBy: "Dr. Williams",
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    address: "456 Oak Ave, Somewhere, NY 67890",
    phone: "(555) 987-6543",
    medicalNotes:
      "Patient is allergic to penicillin. Has asthma that is well-controlled with current medication.",
    createdAt: "2023-02-10T11:45:00Z",
    updatedAt: "2023-04-05T10:20:00Z",
    createdBy: "Dr. Martinez",
    updatedBy: "Dr. Johnson",
  },
  {
    id: "P003",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    address: "789 Pine Rd, Elsewhere, TX 54321",
    phone: "(555) 456-7890",
    medicalNotes:
      "Patient has type 2 diabetes. Needs regular monitoring of blood glucose levels.",
    createdAt: "2023-01-20T13:15:00Z",
    updatedAt: "2023-03-25T16:30:00Z",
    createdBy: "Dr. Williams",
    updatedBy: "Dr. Martinez",
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    address: "321 Maple Dr, Nowhere, FL 98765",
    phone: "(555) 789-0123",
    medicalNotes:
      "Patient has mild anxiety. Responds well to current treatment plan.",
    createdAt: "2023-02-25T10:00:00Z",
    updatedAt: "2023-04-10T09:45:00Z",
    createdBy: "Dr. Johnson",
    updatedBy: "Dr. Johnson",
  },
  {
    id: "P005",
    name: "Robert Wilson",
    age: 63,
    gender: "Male",
    address: "654 Cedar Ln, Anywhere, WA 13579",
    phone: "(555) 321-6540",
    medicalNotes:
      "Patient recovering from knee replacement surgery. Physical therapy ongoing.",
    createdAt: "2023-01-05T15:30:00Z",
    updatedAt: "2023-03-15T11:20:00Z",
    createdBy: "Dr. Martinez",
    updatedBy: "Dr. Williams",
  },
];
