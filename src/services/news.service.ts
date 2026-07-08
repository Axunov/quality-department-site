import { supabase } from "@/lib/supabase";

export type NewsItem = {
  id: string;
  slug: string;

  title_ru: string;
  title_uz: string;
  title_en: string;

  text_ru: string;
  text_uz: string;
  text_en: string;

  content_ru?: string | null;
  content_uz?: string | null;
  content_en?: string | null;

  category?: string | null;
  author?: string | null;
  image_url?: string | null;
  gallery_urls?: string[] | null;
  published?: boolean;
  created_at: string;
};

export async function getNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as NewsItem[];
}

export async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as NewsItem;
}