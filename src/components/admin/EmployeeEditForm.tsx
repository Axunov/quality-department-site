"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Employee = {
  id: string;

  fullname_ru?: string | null;
  fullname_uz?: string | null;
  fullname_en?: string | null;

  full_name_ru?: string | null;
  full_name_uz?: string | null;
  full_name_en?: string | null;

  position_ru?: string | null;
  position_uz?: string | null;
  position_en?: string | null;

  department_ru?: string | null;
  department_uz?: string | null;
  department_en?: string | null;

  phone?: string | null;
  email?: string | null;
  telegram?: string | null;
  room?: string | null;

  reception_ru?: string | null;
  reception_uz?: string | null;
  reception_en?: string | null;

  photo_url?: string | null;
  sort_order?: number | null;
  published?: boolean | null;
};

const labels = {
  ru: {
    titleRu: "Ф.И.О. RU",
    titleUz: "Ф.И.О. UZ",
    titleEn: "Ф.И.О. EN",
    positionRu: "Должность RU",
    positionUz: "Должность UZ",
    positionEn: "Должность EN",
    departmentRu: "Подразделение RU",
    departmentUz: "Подразделение UZ",
    departmentEn: "Подразделение EN",
    phone: "Телефон",
    email: "Email",
    telegram: "Telegram",
    room: "Кабинет",
    receptionRu: "График приёма RU",
    receptionUz: "График приёма UZ",
    receptionEn: "График приёма EN",
    order: "Порядок отображения",
    published: "Показывать на сайте",
    photo: "Фото сотрудника",
    choosePhoto: "Выбрать фото",
    save: "Сохранить изменения",
    saving: "Сохраняется...",
    success: "Данные сотрудника обновлены.",
    back: "← Назад к сотрудникам",
  },
  uz: {
    titleRu: "F.I.Sh. RU",
    titleUz: "F.I.Sh. UZ",
    titleEn: "F.I.Sh. EN",
    positionRu: "Lavozim RU",
    positionUz: "Lavozim UZ",
    positionEn: "Lavozim EN",
    departmentRu: "Bo‘lim RU",
    departmentUz: "Bo‘lim UZ",
    departmentEn: "Bo‘lim EN",
    phone: "Telefon",
    email: "Email",
    telegram: "Telegram",
    room: "Xona",
    receptionRu: "Qabul vaqti RU",
    receptionUz: "Qabul vaqti UZ",
    receptionEn: "Qabul vaqti EN",
    order: "Ko‘rsatish tartibi",
    published: "Saytda ko‘rsatish",
    photo: "Xodim rasmi",
    choosePhoto: "Rasm tanlash",
    save: "O‘zgarishlarni saqlash",
    saving: "Saqlanmoqda...",
    success: "Xodim ma’lumotlari yangilandi.",
    back: "← Xodimlarga qaytish",
  },
  en: {
    titleRu: "Full name RU",
    titleUz: "Full name UZ",
    titleEn: "Full name EN",
    positionRu: "Position RU",
    positionUz: "Position UZ",
    positionEn: "Position EN",
    departmentRu: "Department RU",
    departmentUz: "Department UZ",
    departmentEn: "Department EN",
    phone: "Phone",
    email: "Email",
    telegram: "Telegram",
    room: "Room",
    receptionRu: "Reception hours RU",
    receptionUz: "Reception hours UZ",
    receptionEn: "Reception hours EN",
    order: "Display order",
    published: "Show on website",
    photo: "Employee photo",
    choosePhoto: "Choose photo",
    save: "Save changes",
    saving: "Saving...",
    success: "Employee information updated.",
    back: "← Back to employees",
  },
};

export default function EmployeeEditForm({
  employee,
}: {
  employee: Employee;
}) {
  const locale = useLocale();
  const router = useRouter();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photoUrl, setPhotoUrl] = useState(employee.photo_url || "");

  async function choosePhoto() {
    try {
      const picker = (window as any).showOpenFilePicker;

      if (!picker) {
        setMessage("Браузер не поддерживает системный выбор файла.");
        return;
      }

      const [fileHandle] = await picker({
        multiple: false,
        types: [
          {
            description: "Images",
            accept: {
              "image/*": [".jpg", ".jpeg", ".png", ".webp"],
            },
          },
        ],
      });

      const file = await fileHandle.getFile();
      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const storageName = `${Date.now()}-employee.${extension}`;

      setLoading(true);
      setMessage("");

      const { error: uploadError } = await supabase.storage
        .from("employees")
        .upload(storageName, file);

      if (uploadError) {
        setMessage("Ошибка загрузки фото: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("employees")
        .getPublicUrl(storageName);

      setPhotoUrl(data.publicUrl);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      if (error?.name !== "AbortError") {
        setMessage(error?.message || "Не удалось выбрать фото.");
      }
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    const fullNameRu = String(form.get("full_name_ru") || "");
    const fullNameUz = String(form.get("full_name_uz") || "");
    const fullNameEn = String(form.get("full_name_en") || "");

    const payload = {
      full_name_ru: fullNameRu,
      full_name_uz: fullNameUz,
      full_name_en: fullNameEn,

      fullname_ru: fullNameRu,
      fullname_uz: fullNameUz,
      fullname_en: fullNameEn,

      position_ru: String(form.get("position_ru") || ""),
      position_uz: String(form.get("position_uz") || ""),
      position_en: String(form.get("position_en") || ""),

      department_ru: String(form.get("department_ru") || ""),
      department_uz: String(form.get("department_uz") || ""),
      department_en: String(form.get("department_en") || ""),

      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      telegram: String(form.get("telegram") || ""),
      room: String(form.get("room") || ""),

      reception_ru: String(form.get("reception_ru") || ""),
      reception_uz: String(form.get("reception_uz") || ""),
      reception_en: String(form.get("reception_en") || ""),

      photo_url: photoUrl,
      sort_order: Number(form.get("sort_order") || 0),
      published: form.get("published") === "on",
    };

    const { error } = await supabase
      .from("employees")
      .update(payload)
      .eq("id", employee.id);

    if (error) {
      setMessage("Ошибка сохранения: " + error.message);
      setLoading(false);
      return;
    }

    setMessage(t.success);
    setLoading(false);
    router.refresh();
  }

  const initialFullNameRu =
    employee.full_name_ru || employee.fullname_ru || "";

  const initialFullNameUz =
    employee.full_name_uz || employee.fullname_uz || "";

  const initialFullNameEn =
    employee.full_name_en || employee.fullname_en || "";

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => router.push(`/${currentLocale}/admin/employees`)}
        className="mb-6 rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-700"
      >
        {t.back}
      </button>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow"
      >
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-3xl bg-slate-100 text-7xl">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={initialFullNameRu}
                  className="h-full w-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>

            <button
              type="button"
              onClick={choosePhoto}
              disabled={loading}
              className="mt-4 w-52 rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white disabled:opacity-60"
            >
              {t.choosePhoto}
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.titleRu}</span>
              <input
                name="full_name_ru"
                defaultValue={initialFullNameRu}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.titleUz}</span>
              <input
                name="full_name_uz"
                defaultValue={initialFullNameUz}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.titleEn}</span>
              <input
                name="full_name_en"
                defaultValue={initialFullNameEn}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.positionRu}
              </span>
              <input
                name="position_ru"
                defaultValue={employee.position_ru || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.positionUz}
              </span>
              <input
                name="position_uz"
                defaultValue={employee.position_uz || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.positionEn}
              </span>
              <input
                name="position_en"
                defaultValue={employee.position_en || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.departmentRu}
              </span>
              <input
                name="department_ru"
                defaultValue={employee.department_ru || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.departmentUz}
              </span>
              <input
                name="department_uz"
                defaultValue={employee.department_uz || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.departmentEn}
              </span>
              <input
                name="department_en"
                defaultValue={employee.department_en || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.phone}</span>
              <input
                name="phone"
                defaultValue={employee.phone || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.email}</span>
              <input
                name="email"
                defaultValue={employee.email || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.telegram}</span>
              <input
                name="telegram"
                defaultValue={employee.telegram || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.room}</span>
              <input
                name="room"
                defaultValue={employee.room || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.receptionRu}
              </span>
              <input
                name="reception_ru"
                defaultValue={employee.reception_ru || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.receptionUz}
              </span>
              <input
                name="reception_uz"
                defaultValue={employee.reception_uz || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">
                {t.receptionEn}
              </span>
              <input
                name="reception_en"
                defaultValue={employee.reception_en || ""}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">{t.order}</span>
              <input
                name="sort_order"
                type="number"
                defaultValue={employee.sort_order || 0}
                className="rounded-xl border border-slate-200 p-3"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <input
                name="published"
                type="checkbox"
                defaultChecked={employee.published !== false}
              />
              <span className="font-semibold text-slate-700">
                {t.published}
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            disabled={loading}
            className="rounded-xl bg-blue-700 px-7 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? t.saving : t.save}
          </button>

          {message && (
            <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium">
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}