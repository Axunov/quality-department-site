import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("news")
    .select("*");

  return (
    <main className="container-main py-20">
      <h1 className="text-3xl font-bold mb-8">
        Проверка подключения к Supabase
      </h1>

      {error && (
        <pre className="text-red-600">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      <pre className="bg-slate-100 rounded-xl p-6 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}