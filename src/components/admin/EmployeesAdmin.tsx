"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";

const labels = {
  ru: {
    title: "Сотрудники",
    subtitle: "Управление сотрудниками сайта",
    import: "📥 Импорт из Excel",
    add: "+ Добавить сотрудника",
    edit: "Редактировать",
    delete: "Удалить",
    deleteConfirm: "Удалить сотрудника?",
    added: "Сотрудник добавлен!",
    fullName: "Ф.И.О. RU",
    position: "Должность RU",
    department: "Отдел / кафедра RU",
    phone: "Телефон",
    email: "Email",
    empty: "Сотрудники пока не добавлены",
  },
  uz: {
    title: "Xodimlar",
    subtitle: "Sayt xodimlarini boshqarish",
    import: "📥 Excel’dan import",
    add: "+ Xodim qo‘shish",
    edit: "Tahrirlash",
    delete: "O‘chirish",
    deleteConfirm: "Xodim o‘chirilsinmi?",
    added: "Xodim qo‘shildi!",
    fullName: "F.I.Sh. UZ",
    position: "Lavozim UZ",
    department: "Bo‘lim / kafedra UZ",
    phone: "Telefon",
    email: "Email",
    empty: "Hozircha xodimlar qo‘shilmagan",
  },
  en: {
    title: "Employees",
    subtitle: "Manage website employees",
    import: "📥 Import from Excel",
    add: "+ Add employee",
    edit: "Edit",
    delete: "Delete",
    deleteConfirm: "Delete this employee?",
    added: "Employee added!",
    fullName: "Full name EN",
    position: "Position EN",
    department: "Department EN",
    phone: "Phone",
    email: "Email",
    empty: "No employees have been added yet",
  },
};

export default function EmployeesAdmin() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const locale = useLocale();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  async function loadEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Ошибка загрузки сотрудников:", error);
    setMessage("Ошибка загрузки сотрудников: " + error.message);
    setEmployees([]);
    return;
  }

  setEmployees(data || []);
}

  useEffect(() => {
    loadEmployees();
  }, []);

  async function addEmployee() {
    const fullName = prompt(t.fullName) || "";
    if (!fullName) return;

    const position = prompt(t.position) || "";
    const department = prompt(t.department) || "";
    const phone = prompt(t.phone) || "";
    const email = prompt(t.email) || "";

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("employees").insert({
      full_name_ru: fullName,
      full_name_uz: fullName,
      full_name_en: fullName,

      fullname_ru: fullName,
      fullname_uz: fullName,
      fullname_en: fullName,

      position_ru: position,
      position_uz: position,
      position_en: position,

      department_ru: department,
      department_uz: department,
      department_en: department,

      phone,
      email,
      photo_url: "",
      published: true,
    });

    if (error) {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
  setMessage(error.message);
  setLoading(false);
  return;
}     else {
      setMessage(t.added);
      await loadEmployees();
    }

    setLoading(false);
  }

  async function deleteEmployee(id: string) {
    if (!confirm(t.deleteConfirm)) return;

    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Ошибка удаления: " + error.message);
      return;
    }

    await loadEmployees();
  }

  async function importFromExcelText() {
    const text = prompt(
      "Скопируйте строки из Excel и вставьте сюда:\nФИО | Должность | Отдел | Телефон | Email"
    );

    if (!text) return;

    const rows = text
      .split("\n")
      .map((row) => row.split("\t"))
      .filter((row) => row[0]?.trim());

    const employeesToInsert = rows.map((row, index) => ({
      full_name_ru: row[0] || "",
      full_name_uz: row[0] || "",
      full_name_en: row[0] || "",

      fullname_ru: row[0] || "",
      fullname_uz: row[0] || "",
      fullname_en: row[0] || "",

      position_ru: row[1] || "",
      position_uz: row[1] || "",
      position_en: row[1] || "",

      department_ru: row[2] || "",
      department_uz: row[2] || "",
      department_en: row[2] || "",

      phone: row[3] || "",
      email: row[4] || "",
      sort_order: index + 1,
      photo_url: "",
      published: true,
    }));

    const { error } = await supabase
      .from("employees")
      .insert(employeesToInsert);

    if (error) {
      alert("Ошибка импорта: " + error.message);
      return;
    }

    alert(`Импортировано: ${employeesToInsert.length}`);
    await loadEmployees();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
          <p className="mt-2 text-slate-500">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addEmployee}
            disabled={loading}
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {t.add}
          </button>

          <button
            type="button"
            onClick={importFromExcelText}
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white"
          >
            {t.import}
          </button>
        </div>
      </div>

      {message && (
        <p className="mb-5 rounded-lg bg-white p-4 shadow">{message}</p>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {employees.map((emp) => {
          const fullName =
            currentLocale === "uz"
              ? emp.full_name_uz || emp.fullname_uz || emp.full_name_ru || emp.fullname_ru
              : currentLocale === "en"
                ? emp.full_name_en || emp.fullname_en || emp.full_name_ru || emp.fullname_ru
                : emp.full_name_ru || emp.fullname_ru;

          const position =
            currentLocale === "uz"
              ? emp.position_uz || emp.position_ru
              : currentLocale === "en"
                ? emp.position_en || emp.position_ru
                : emp.position_ru;

          const department =
            currentLocale === "uz"
              ? emp.department_uz || emp.department_ru
              : currentLocale === "en"
                ? emp.department_en || emp.department_ru
                : emp.department_ru;

          return (
            <div
              key={emp.id}
              className="rounded-2xl bg-white p-5 shadow"
            >
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-5xl">
                {emp.photo_url ? (
                  <img
                    src={emp.photo_url}
                    alt={fullName || ""}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "👤"
                )}
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {fullName}
              </h2>

              <p className="mt-2 text-sm text-blue-700">{position}</p>
              <p className="mt-1 text-sm text-slate-500">{department}</p>

              {emp.phone && (
                <p className="mt-3 text-sm text-slate-600">{emp.phone}</p>
              )}

              {emp.email && (
                <p className="text-sm text-slate-600">{emp.email}</p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/admin/employees/${emp.id}/edit`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  ✏️ {t.edit}
                </Link>

                <button
                  type="button"
                  onClick={() => deleteEmployee(emp.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          );
        })}

        {employees.length === 0 && (
          <div className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500 shadow">
            {t.empty}
          </div>
        )}
      </div>
    </div>
  );
}