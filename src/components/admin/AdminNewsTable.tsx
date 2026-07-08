"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import NewsDeleteButton from "@/components/admin/NewsDeleteButton";

export default function AdminNewsTable({ news }: { news: any[] }) {
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return news;

    return news.filter((item) => {
      return (
        item.title_ru?.toLowerCase().includes(q) ||
        item.title_uz?.toLowerCase().includes(q) ||
        item.title_en?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
      );
    });
  }, [news, search]);

  return (
    <div>
      <div className="mb-5 rounded-2xl bg-white p-4 shadow">
        <textarea
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по новостям..."
          className="h-12 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
          />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-4">Фото</th>
              <th className="p-4">Заголовок</th>
              <th className="p-4">Категория</th>
              <th className="p-4">Дата</th>
              <th className="p-4 text-right">Действия</th>
            </tr>
          </thead>

          <tbody>
            {filteredNews.map((item: any) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title_ru}
                      className="h-14 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100">
                      📰
                    </div>
                  )}
                </td>

                <td className="p-4 font-semibold text-slate-900">
                  {item.title_ru}
                </td>

                <td className="p-4 text-slate-600">
                  {item.category || "Новости"}
                </td>

                <td className="p-4 text-slate-500">
                  {new Date(item.created_at).toLocaleDateString("ru-RU")}
                </td>

                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/news/${item.slug}`}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700"
                    >
                      👁
                    </Link>

                    <Link
                      href={`/admin/news/${item.slug}/edit`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white"
                    >
                      ✏️
                    </Link>

                    <NewsDeleteButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}

            {filteredNews.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Новости не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}