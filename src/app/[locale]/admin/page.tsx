import { getNews } from "@/services/news.service";
import { Link } from "@/i18n/routing";
import AdminNewsTable from "@/components/admin/AdminNewsTable";

const labels = {
  ru: {
    title: "Новости",
    subtitle: "Управление новостями сайта",
    add: "+ Новая новость",
  },
  uz: {
    title: "Yangiliklar",
    subtitle: "Sayt yangiliklarini boshqarish",
    add: "+ Yangi yangilik",
  },
  en: {
    title: "News",
    subtitle: "Manage website news",
    add: "+ New news",
  },
};

export default async function AdminNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = labels[locale as "ru" | "uz" | "en"] || labels.ru;

  const news = await getNews();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
          <p className="mt-2 text-slate-500">{t.subtitle}</p>
        </div>

        <Link
          href="/admin/news/new"
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          {t.add}
        </Link>
      </div>

      <AdminNewsTable news={news} />
    </div>
  );
}