"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { CREATE_STUDENT } from "@/lib/graphql/mutations";
import { Plus } from "lucide-react";

export function CreateStudentDialog({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    lrn: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    contactNo: "",
  });

  const [createStudentMutation, { loading }] = useMutation(CREATE_STUDENT, {
    onCompleted: () => {
      toast.success("Student created successfully!");
      setFormData({
        lrn: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        contactNo: "",
      });
      setOpen(false);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStudentMutation({
      variables: {
        createStudentInput: {
          ...formData,
          middleName: formData.middleName || null,
        },
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[525px]", className)} {...props}>
        <DialogHeader>
          <DialogTitle>Create Student</DialogTitle>
          <DialogDescription>
            Enter the details for the new student. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="lrn">LRN *</FieldLabel>
              <Input
                id="lrn"
                placeholder="12-digit LRN"
                required
                value={formData.lrn}
                onChange={handleChange}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
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
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="email">Email *</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contactNo">Contact No *</FieldLabel>
                <Input
                  id="contactNo"
                  required
                  value={formData.contactNo}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Button type="submit" disabled={loading} className="mt-4 w-full">
              {loading ? "Creating..." : "Save Student"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
