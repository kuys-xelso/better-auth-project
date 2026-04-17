"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Student = {
  id: string;
  lrn: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  contactNo: string;
};

export const columns: ColumnDef<Student>[] = [
  { accessorKey: "lrn", header: "LRN" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "contactNo", header: "Contact No." },
];
