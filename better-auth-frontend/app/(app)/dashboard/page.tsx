import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { query } from "@/lib/apollo/client";
import { GET_STUDENTS } from "@/lib/graphql/queries";

export default async function DashboardPage() {
  await query({
    query: GET_STUDENTS,
    fetchPolicy: "no-cache",
  });

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div></div>
    </div>
  );
}
