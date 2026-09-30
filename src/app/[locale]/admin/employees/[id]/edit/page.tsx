import { getLocale } from "next-intl/server";
import { surveyText } from "@/lib/surveyI18n";
import EmployeeEditForm from "@/components/admin/EmployeeEditForm";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EmployeeEditPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const currentLocale = await getLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  const { id } = await params;

  const { data: employee, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-red-700">
        <h1 className="text-2xl font-bold">{tr("Ошибка загрузки сотрудника")}</h1>
        <p className="mt-3">{error.message}</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="rounded-2xl bg-amber-50 p-6 text-amber-800">
        <h1 className="text-2xl font-bold">{tr("Сотрудник не найден")}</h1>
        <p className="mt-3">{tr("Запись с идентификатором")} {id} {tr("недоступна или была удалена.")}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900">{tr("Редактирование сотрудника")}</h1>

      <EmployeeEditForm employee={employee} />
    </div>
  );
}