import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Patient } from "@/types/patient";
import { formatDate } from "@/lib/utils";
import { Loading } from "@/components/ui/loading";
import { Link } from "@tanstack/react-router";
import { usePatients, useDeletePatient } from "@/lib/usePatients";

export function PatientsTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
  // Default sorting by createdAt descending
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Fetch patients using React Query
  const { data: patients = [], isLoading } = usePatients();

  // Delete patient mutation
  const deletePatientMutation = useDeletePatient();

  function handleDeleteClick(patientId: string) {
    setPatientToDelete(patientId);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!patientToDelete) return;

    try {
      await deletePatientMutation.mutateAsync(patientToDelete);
    } catch (error) {
      console.error("Failed to delete patient:", error);
    } finally {
      setDeleteDialogOpen(false);
      setPatientToDelete(null);
    }
  }

  // Define columns for the data table
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent hover:text-primary font-medium group flex items-center gap-1"
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowUp className="h-4 w-4" />
                <span>(A-Z)</span>
              </div>
            ) : column.getIsSorted() === "desc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowDown className="h-4 w-4" />
                <span>(Z-A)</span>
              </div>
            ) : (
              <ArrowUpDown className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent hover:text-primary font-medium hidden md:inline-flex group items-center gap-1"
          >
            Age
            {column.getIsSorted() === "asc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowUp className="h-4 w-4" />
                <span>(Low-High)</span>
              </div>
            ) : column.getIsSorted() === "desc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowDown className="h-4 w-4" />
                <span>(High-Low)</span>
              </div>
            ) : (
              <ArrowUpDown className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="hidden md:block">{row.getValue("age")}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent hover:text-primary font-medium hidden md:inline-flex group items-center gap-1"
          >
            Gender
            {column.getIsSorted() === "asc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowUp className="h-4 w-4" />
                <span>(A-Z)</span>
              </div>
            ) : column.getIsSorted() === "desc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowDown className="h-4 w-4" />
                <span>(Z-A)</span>
              </div>
            ) : (
              <ArrowUpDown className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="hidden md:block">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      enableSorting: false,
      cell: ({ row }) => {
        const address = row.getValue<string>("address");
        return (
          <div className="hidden lg:block">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="max-w-[150px] truncate inline-block">
                  {address}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{address}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="hidden md:block">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "medicalNotes",
      header: "Medical Notes",
      enableSorting: false,
      cell: ({ row }) => {
        const notes = row.getValue<string>("medicalNotes");
        return (
          <div className="hidden lg:block">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="max-w-[150px] truncate inline-block">
                  {notes}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[300px] whitespace-pre-wrap">{notes}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent hover:text-primary font-medium hidden lg:inline-flex group items-center gap-1"
          >
            Created At
            {column.getIsSorted() === "asc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowUp className="h-4 w-4" />
                <span>(Oldest first)</span>
              </div>
            ) : column.getIsSorted() === "desc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowDown className="h-4 w-4" />
                <span>(Newest first)</span>
              </div>
            ) : (
              <ArrowUpDown className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="hidden lg:block">
          {formatDate(row.getValue<string>("createdAt"))}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent hover:text-primary font-medium hidden lg:inline-flex group items-center gap-1"
          >
            Updated At
            {column.getIsSorted() === "asc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowUp className="h-4 w-4" />
                <span>(Oldest first)</span>
              </div>
            ) : column.getIsSorted() === "desc" ? (
              <div className="flex items-center gap-1 text-primary text-xs">
                <ArrowDown className="h-4 w-4" />
                <span>(Newest first)</span>
              </div>
            ) : (
              <ArrowUpDown className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="hidden lg:block">
          {formatDate(row.getValue<string>("updatedAt"))}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      enableSorting: false,
      cell: ({ row }) => {
        const patient = row.original;

        return (
          <div className="flex justify-end gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:bg-primary/10"
                >
                  <Link
                    to="/patients/$patientId/edit"
                    params={{ patientId: patient.id }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit patient</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-destructive/10 hover:text-destructive"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteClick(patient.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete patient</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // Create the table instance
  const table = useReactTable({
    data: patients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (isLoading) {
    return <Loading text="Loading patients..." className="py-10" />;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={event =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8 w-[300px] focus-visible:ring-primary/20"
            />
          </div>
        </div>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50 transition-colors cursor-default"
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <UserRound className="h-8 w-8 mb-2 opacity-50" />
                        <p>No patients found</p>
                        <p className="text-sm">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              patient record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
