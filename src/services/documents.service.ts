import { supabase } from "@/lib/supabase";

export type DocumentItem = {
  id: string;
  title_ru?: string | null;
  title_uz?: string | null;
  title_en?: string | null;
  description_ru?: string | null;
  description_uz?: string | null;
  description_en?: string | null;
  category?: string | null;
  file_url: string;
  file_name?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  preview_url?: string | null;
  published?: boolean;
  created_at?: string;
};

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

  return (data || []) as DocumentItem[];
}
