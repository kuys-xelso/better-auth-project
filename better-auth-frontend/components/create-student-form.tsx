"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { CREATE_STUDENT } from "@/lib/graphql/mutations";

export function CreateStudentForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  // Added 'lrn' to the state
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create Student</CardTitle>
          <CardDescription>Add a new student to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* LRN Field - Vital for your Prisma schema */}
              <Field>
                <FieldLabel htmlFor="lrn">
                  LRN (Learner Reference Number) *
                </FieldLabel>
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
                  <FieldLabel htmlFor="contactNo">Contact Number *</FieldLabel>
                  <Input
                    id="contactNo"
                    required
                    value={formData.contactNo}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              <Button type="submit" disabled={loading} className="mt-4 w-full">
                {loading ? "Creating..." : "Create Student"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
