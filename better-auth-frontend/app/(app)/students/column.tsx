"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useMutation } from "@apollo/client/react";
import { DELETE_STUDENT_BY_ID } from "@/lib/graphql/mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type Student = {
  id: string;
  lrn: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  contactNo: string;
};

const ActionsCell = ({ student }: { student: Student }) => {
  const router = useRouter();
  const [deleteStudent, { loading }] = useMutation(DELETE_STUDENT_BY_ID, {
    onCompleted: () => {
      toast.success("Student deleted successfully");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete student");
    },
  });

  const handleDelete = async () => {
    await deleteStudent({
      variables: { id: student.id },
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        size="sm"
        className="bg-green-500 hover:bg-green-600"
        onClick={() => console.log("Editing:", student.lrn)}
      >
        Edit
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>
                {student.firstName} {student.lastName}
              </strong>{" "}
              (LRN: {student.lrn}). This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const columns: ColumnDef<Student>[] = [
  { accessorKey: "lrn", header: "LRN" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "middleName", header: "Middle Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "contactNo", header: "Contact No." },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell student={row.original} />,
  },
];
