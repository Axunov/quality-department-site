import { PageHeader } from "@/components/common/PageHeader";

export default function ContactsPage() {
  return (
    <main>
      <PageHeader
        label="Контакты"
        title="Контакты отдела"
        description="Адрес, телефон, график работы и контактные данные отдела контроля качества образования."
      />

      <section className="container-main py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
            <h2 className="section-title">Контактная информация</h2>

            <div className="mt-8 space-y-6 text-slate-700">
              <div>
                <p className="font-bold text-slate-900">Адрес</p>
                <p className="mt-2">Ташкентская область, Кибрайский район, Корамурт 1</p>
              </div>

              <div>
                <p className="font-bold text-slate-900">Телефон</p>
                <p className="mt-2">+998 90 322-26-29</p>
              </div>

              <div>
                <p className="font-bold text-slate-900">Email</p>
                <p className="mt-2">quality@sbumiptk.uz</p>
              </div>

              <div>
                <p className="font-bold text-slate-900">Сотрудники</p>
                <p className="mt-2">Рустамов Фархад Нурматович</p>
                <p>Эшметова Дилафруз</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] bg-white shadow-xl shadow-slate-200/70">
            <div className="flex h-[420px] items-center justify-center bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] p-8 text-center text-white">
              <div>
                <p className="text-5xl">📍</p>
                <h2 className="mt-5 text-3xl font-bold">Карта расположения</h2>
                <p className="mt-4 text-blue-50">
                  Здесь позже подключим Google Maps или Яндекс.Карту.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
