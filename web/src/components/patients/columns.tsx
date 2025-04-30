import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatDate, truncateText } from "@/lib/utils";
import type { Patient } from "@/lib/types";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <div className="hidden md:block">{row.getValue("age")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="hidden md:block">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="hidden lg:block max-w-[200px]">
        {truncateText(row.getValue<string>("address"), 30)}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="hidden md:block">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "medicalNotes",
    header: "Medical Notes",
    cell: ({ row }) => (
      <div className="hidden lg:block max-w-[200px]">
        {truncateText(row.getValue<string>("medicalNotes"), 30)}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="hidden lg:block">
        {formatDate(row.getValue<string>("createdAt"))}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="hidden lg:block">
        {formatDate(row.getValue<string>("updatedAt"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link
              to="/patients/$patientId/edit"
              params={{ patientId: patient.id }}
              onClick={e => e.stopPropagation()}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={e => {
              e.stopPropagation();
              // This will be handled by the parent component
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      );
    },
  },
];
