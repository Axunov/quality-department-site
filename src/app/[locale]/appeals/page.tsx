import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";

const categories = [
  "Вопрос по качеству занятий",
  "Предложение по улучшению учебного процесса",
  "Замечание по организации экзаменов",
  "Обращение по аккредитации",
  "Другое обращение",
];

export default function AppealsPage() {
  return (
    <main>
      <PageHeader
        label="Обращения"
        title="Электронные обращения"
        description="Раздел для направления предложений, замечаний и вопросов, связанных с качеством образовательного процесса."
      />

      <section className="container-main py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
            <h2 className="section-title">Категории обращений</h2>

            <div className="mt-8 grid gap-4">
              {categories.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-900"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold">Отправить обращение</h2>

            <p className="mt-5 leading-8 text-blue-50">
              В следующем этапе мы подключим форму отправки обращения, чтобы
              студенты, преподаватели, родители и работодатели могли направлять
              вопросы и предложения напрямую в отдел.
            </p>

            <Link href="/contacts" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-[#0b3b78]">
              Перейти к контактам
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}