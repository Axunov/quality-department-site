import { supabase } from "@/lib/supabase";

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Ошибка загрузки сотрудников:", error);
    return [];
  }

  return data || [];
}