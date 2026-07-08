import { PageHeader } from "@/components/common/PageHeader";

const indicators = [
  { title: "Посещаемость занятий", value: "87%", icon: "👥" },
  { title: "Успеваемость студентов", value: "91%", icon: "🎓" },
  { title: "Качество занятий", value: "89%", icon: "📊" },
  { title: "Активные опросы", value: "12", icon: "📝" },
];

export default function MonitoringPage() {
  return (
    <main>
      <PageHeader
        label="Мониторинг"
        title="Мониторинг качества образования"
        description="Анализ посещаемости, успеваемости, качества занятий, экзаменов и образовательной среды института."
      />

      <section className="container-main py-16">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {indicators.map((item) => (
            <div
              key={item.title}
              className="rounded-[30px] bg-white p-7 shadow-xl shadow-slate-200/70"
            >
              <div className="text-5xl">{item.icon}</div>
              <p className="mt-6 text-5xl font-extrabold text-[#0b3b78]">
                {item.value}
              </p>
              <p className="mt-3 font-semibold text-slate-700">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
          <h2 className="section-title">Основные направления мониторинга</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              "контроль посещаемости занятий",
              "анализ успеваемости студентов",
              "мониторинг качества преподавания",
              "контроль проведения экзаменов",
              "анализ результатов опросов",
              "подготовка аналитических отчетов",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-900">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}