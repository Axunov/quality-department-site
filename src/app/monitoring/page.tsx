const indicators = [
  { title: "Посещаемость занятий", value: "87%" },
  { title: "Успеваемость студентов", value: "91%" },
  { title: "Качество проведения занятий", value: "89%" },
  { title: "Удовлетворенность студентов", value: "84%" },
];

const areas = [
  "мониторинг посещаемости занятий;",
  "контроль проведения экзаменов;",
  "анализ качества преподавания;",
  "оценка учебно-методического обеспечения;",
  "рейтинг кафедр и факультетов;",
  "подготовка аналитических отчетов.",
];

export default function MonitoringPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Мониторинг
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Мониторинг качества образования
          </h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            Раздел предназначен для анализа посещаемости, успеваемости,
            качества занятий, экзаменов и образовательной среды института.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-4">
          {indicators.map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="text-4xl font-bold text-blue-700">{item.value}</div>
              <p className="mt-3 text-slate-600">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Направления мониторинга</h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {areas.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Аналитика</h2>
            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Посещаемость</span>
                  <span>87%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[87%] rounded-full bg-blue-700" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Успеваемость</span>
                  <span>91%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[91%] rounded-full bg-green-600" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Качество занятий</span>
                  <span>89%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[89%] rounded-full bg-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}