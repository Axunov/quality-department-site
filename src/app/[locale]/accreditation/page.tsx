import { PageHeader } from "@/components/common/PageHeader";

const sections = [
  {
    title: "Комплексная государственная аккредитация",
    description:
      "Подготовка института к комплексной государственной аккредитации, координация рабочих групп и сопровождение процедуры.",
    icon: "🏛️",
  },
  {
    title: "Специальная аккредитация",
    description:
      "Подготовка образовательных программ к специальной аккредитации в соответствии с требованиями Национального агентства.",
    icon: "🎓",
  },
  {
    title: "Самооценка",
    description:
      "Формирование отчёта по самооценке, анализ показателей и сбор доказательной базы.",
    icon: "📋",
  },
  {
    title: "Индикаторы качества",
    description:
      "Мониторинг выполнения критериев, анализ результатов и контроль выполнения мероприятий.",
    icon: "📊",
  },
  {
    title: "Нормативные документы",
    description:
      "Законы, постановления, государственные образовательные стандарты и внутренние документы.",
    icon: "📚",
  },
  {
    title: "Рабочие группы",
    description:
      "Ответственные лица, распределение обязанностей и контроль исполнения дорожной карты.",
    icon: "👥",
  },
];

export default function AccreditationPage() {
  return (
    <main>
      <PageHeader
        label="Аккредитация"
        title="Аккредитация и обеспечение качества образования"
        description="Информация о комплексной и специальной аккредитации, самооценке, нормативных документах, индикаторах качества и деятельности рабочих групп."
      />

      <section className="container-main py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((item) => (
            <div
              key={item.title}
              className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                {item.icon}
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {item.description}
              </p>

              <button className="mt-8 rounded-xl bg-[#0b3b78] px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                Подробнее
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[30px] bg-gradient-to-r from-[#0b3b78] to-[#0ea5a3] p-10 text-white">
          <h2 className="text-3xl font-bold">
            Текущее состояние подготовки
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <div>
              <p className="text-5xl font-extrabold">12</p>
              <p className="mt-2">Рабочих групп</p>
            </div>

            <div>
              <p className="text-5xl font-extrabold">150+</p>
              <p className="mt-2">Подготовленных документов</p>
            </div>

            <div>
              <p className="text-5xl font-extrabold">100%</p>
              <p className="mt-2">Ответственных назначено</p>
            </div>

            <div>
              <p className="text-5xl font-extrabold">24/7</p>
              <p className="mt-2">Мониторинг выполнения</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}