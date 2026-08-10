import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <main className="container-main py-16">
      <h1 className="text-4xl font-bold">Добавить новость</h1>
      <NewsForm />
    </main>
  );
}