import { CreateStudentForm } from "@/components/create-student-form";
import { DataTable } from "@/components/data-table";
import { query } from "@/lib/apollo/client";
import { GET_STUDENTS } from "@/lib/graphql/queries";
import { columns, type Student } from "./column";

export default async function StudentsPage() {
  const { data } = await query({
    query: GET_STUDENTS,
    fetchPolicy: "no-cache",
  });
  const students = (data as { students: Student[] }).students;

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <CreateStudentForm />
        <div className="mt-4 text-sm text-muted-foreground">
          This is a demo application. The students you create here will not be
          saved and will be lost when you refresh the page.
        </div>
        <div className="mt-6">
          <DataTable columns={columns} data={students} />
        </div>
      </div>
    </div>
  );
}
