"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import NewsDeleteButton from "@/components/admin/NewsDeleteButton";
import { getLocalizedText } from "@/utils/getLocalizedText";

const labels = {
  ru: {
    photo: "Фото",
    title: "Заголовок",
    category: "Категория",
    date: "Дата",
    actions: "Действия",
    defaultCategory: "Новости",
    empty: "Новости пока не добавлены",
    view: "Просмотреть",
    edit: "Редактировать",
  },
  uz: {
    photo: "Rasm",
    title: "Sarlavha",
    category: "Toifa",
    date: "Sana",
    actions: "Amallar",
    defaultCategory: "Yangiliklar",
    empty: "Hozircha yangiliklar qo‘shilmagan",
    view: "Ko‘rish",
    edit: "Tahrirlash",
  },
  en: {
    photo: "Photo",
    title: "Title",
    category: "Category",
    date: "Date",
    actions: "Actions",
    defaultCategory: "News",
    empty: "No news has been added yet",
    view: "View",
    edit: "Edit",
  },
};

export default function AdminNewsTable({ news }: { news: any[] }) {
  const locale = useLocale();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const dateLocale =
    currentLocale === "uz"
      ? "uz-UZ"
      : currentLocale === "en"
        ? "en-US"
        : "ru-RU";

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="p-4">{t.photo}</th>
            <th className="p-4">{t.title}</th>
            <th className="p-4">{t.category}</th>
            <th className="p-4">{t.date}</th>
            <th className="p-4 text-right">{t.actions}</th>
          </tr>
        </thead>

        <tbody>
          {news.map((item: any) => {
            const title = getLocalizedText(
              currentLocale,
              item.title_ru,
              item.title_uz,
              item.title_en
            );

            return (
              <tr
                key={item.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="p-4">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={title}
                      className="h-14 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 text-2xl">
                      📰
                    </div>
                  )}
                </td>

                <td className="max-w-md p-4 font-semibold text-slate-900">
                  {title}
                </td>

                <td className="p-4 text-slate-600">
                  {item.category || t.defaultCategory}
                </td>

                <td className="whitespace-nowrap p-4 text-slate-500">
                  {new Date(item.created_at).toLocaleDateString(dateLocale)}
                </td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/news/${item.slug}`}
                      title={t.view}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200"
                    >
                      👁
                    </Link>

                    <Link
                      href={`/admin/news/${item.slug}/edit`}
                      title={t.edit}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                    >
                      ✏️
                    </Link>

                    <NewsDeleteButton id={item.id} />
                  </div>
                </td>
              </tr>
            );
          })}

          {news.length === 0 && (
            <tr>
              <td colSpan={5} className="p-10 text-center text-slate-500">
                {t.empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}