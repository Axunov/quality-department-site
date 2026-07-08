import { supabase } from "@/lib/supabase";

export async function getDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка загрузки документов:", error);
    return [];
  }

  return data || [];
}