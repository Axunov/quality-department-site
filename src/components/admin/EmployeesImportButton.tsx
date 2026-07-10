"use client";

import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";

export default function EmployeesImportButton({
  onImported,
}: {
  onImported: () => void;
}) {
  async function handleFile(file: File) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      alert("Excel файл пустой");
      return;
    }

    const employees = rows.map((row, index) => {
      const fullName =
        row["ФИО"] ||
        row["FIO"] ||
        row["fio"] ||
        row["full_name"] ||
        row["Full name"] ||
        "";

      const position =
        row["Должность"] ||
        row["position"] ||
        row["Position"] ||
        "";

      const department =
        row["Отдел"] ||
        row["Кафедра"] ||
        row["department"] ||
        "";

      const phone =
        row["Телефон"] ||
        row["phone"] ||
        row["Phone"] ||
        "";

      const email =
        row["Email"] ||
        row["email"] ||
        row["E-mail"] ||
        "";

      return {
        full_name_ru: String(fullName),
        full_name_uz: String(fullName),
        full_name_en: String(fullName),

        position_ru: String(position),
        position_uz: String(position),
        position_en: String(position),

        department_ru: String(department),
        department_uz: String(department),
        department_en: String(department),

        phone: String(phone),
        email: String(email),
        sort_order: index + 1,
        photo_url: "",
        published: true,
      };
    });

    const filtered = employees.filter((emp) => emp.full_name_ru.trim());

    if (!filtered.length) {
      alert("Не найдена колонка ФИО");
      return;
    }

    const { error } = await supabase.from("employees").insert(filtered);

    if (error) {
      alert("Ошибка импорта: " + error.message);
      return;
    }

    alert(`Импортировано сотрудников: ${filtered.length}`);
    onImported();
  }

  return (
  <label className="inline-block cursor-pointer rounded-xl bg-green-700 px-6 py-3 font-semibold text-white">
    📥 Импорт из Excel
    <input
      type="file"
      accept=".xlsx,.xls"
      className="sr-only"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        e.target.value = "";
      }}
    />
  </label>
);
}