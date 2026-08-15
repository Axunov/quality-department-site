import { getNews } from "@/services/news.service";
import { Link } from "@/i18n/routing";
import AdminNewsTable from "@/components/admin/AdminNewsTable";

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Новости</h1>
          <p className="mt-2 text-slate-500">
            Управление новостями сайта
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          + Новая новость
        </Link>
      </div>

      <AdminNewsTable news={news} />
    </div>
  );
}