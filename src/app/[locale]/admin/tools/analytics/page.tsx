export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900">
        Аналитика
      </h1>

      <p className="mt-2 text-slate-500">
        Аналитические показатели деятельности отдела.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Мониторинги</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Обращения</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Отчёты</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">0</p>
        </div>
      </div>
    </div>
  );
}