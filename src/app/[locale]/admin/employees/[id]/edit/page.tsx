import EmployeeEditForm from "@/components/admin/EmployeeEditForm";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function EmployeeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: employee, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !employee) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900">
        Редактирование сотрудника
      </h1>

      <EmployeeEditForm employee={employee} />
    </div>
  );
}