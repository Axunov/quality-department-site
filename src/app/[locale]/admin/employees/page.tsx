import EmployeesAdmin from "@/components/admin/EmployeesAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminEmployeesPage() {
  return <EmployeesAdmin />;
}