"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_STUDENT_BY_ID } from "@/lib/graphql/mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Student } from "@/app/(app)/students/column";

interface EditStudentSheetProps {
  student: Student;
  trigger: React.ReactNode;
}

export function EditStudentSheet({ student, trigger }: EditStudentSheetProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    lrn: student.lrn,
    firstName: student.firstName,
    middleName: student.middleName || "",
    lastName: student.lastName,
    email: student.email,
    contactNo: student.contactNo,
  });

  const [updateStudent, { loading }] = useMutation(UPDATE_STUDENT_BY_ID, {
    onCompleted: () => {
      toast.success("Student updated successfully!");
      setOpen(false);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update student");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateStudent({
      variables: {
        updateStudentInput: {
          id: student.id,
          lrn: formData.lrn,
          firstName: formData.firstName,
          middleName: formData.middleName || null,
          lastName: formData.lastName,
          email: formData.email,
          contactNo: formData.contactNo,
        },
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Student</SheetTitle>
          <SheetDescription>
            Make changes to the student's information here.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <FieldGroup className="p-4">
            <Field>
              <FieldLabel htmlFor="lrn">LRN *</FieldLabel>
              <Input
                id="lrn"
                value={formData.lrn}
                onChange={handleChange}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="middleName">Middle Name</FieldLabel>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="contactNo">Contact Number *</FieldLabel>
              <Input
                id="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>
          <SheetFooter className="p-4">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
