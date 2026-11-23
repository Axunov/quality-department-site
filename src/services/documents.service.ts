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

export async function getDocuments(limit?: number) {
  let query = supabase
    .from("documents")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error("Ошибка загрузки документов:", error);
    return [];
  }

  return (data || []) as DocumentItem[];
}

export async function getPublishedDocument(id: string) {
  if (!/^(?:[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}|\d{1,18})$/i.test(id)) return null;
  const {data,error}=await supabase.from("documents").select("*").eq("id",id).eq("published",true).maybeSingle();
  return error ? null : data as DocumentItem|null;
}

export async function getDocumentRevisions(id:string, version?:string){
  const table=supabase.from("document_public_revisions");
  const [history,revision]=await Promise.all([
    table.select("id,archived_at").eq("document_id",id).order("archived_at",{ascending:false}).limit(20),
    version ? table.select("id,archived_at,snapshot").eq("document_id",id).eq("id",version).maybeSingle() : null,
  ]);
  return {history:history.data??[],revision:revision?.data??null};
}
