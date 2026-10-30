"use client";
import NewsForm from "@/components/admin/NewsForm";
import type { NewsItem } from "@/services/news.service";
export default function NewsEditForm({ item }: { item: NewsItem }) { return <NewsForm item={item} />; }
