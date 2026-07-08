import { getNews } from "@/services/news.service";

export default async function AdminDashboardPage() {
  const news = await getNews();

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-500">
        Общая информация по административной панели
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Новости</p>
          <h2 className="mt-2 text-4xl font-bold text-blue-700">
            {news.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Документы</p>
          <h2 className="mt-2 text-4xl font-bold text-blue-700">0</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Сотрудники</p>
          <h2 className="mt-2 text-4xl font-bold text-blue-700">0</h2>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900">
          Последние новости
        </h2>

        <div className="mt-5 space-y-3">
          {news.slice(0, 5).map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {item.title_ru}
                </p>
                <p className="text-sm text-slate-500">
                  {item.category || "Новости"}
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {new Date(item.created_at).toLocaleDateString("ru-RU")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}