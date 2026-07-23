import { supabase } from "@/lib/supabase";

export type EmployeeItem = {
  id: string;
  full_name_ru?: string | null;
  full_name_uz?: string | null;
  full_name_en?: string | null;
  fullname_ru?: string | null;
  fullname_uz?: string | null;
  fullname_en?: string | null;
  position_ru?: string | null;
  position_uz?: string | null;
  position_en?: string | null;
  department_ru?: string | null;
  department_uz?: string | null;
  department_en?: string | null;
  phone?: string | null;
  email?: string | null;
  telegram?: string | null;
  photo_url?: string | null;
  office?: string | null;
  reception_hours_ru?: string | null;
  reception_hours_uz?: string | null;
  reception_hours_en?: string | null;
  sort_order?: number | null;
  published?: boolean;
};

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

  return (data || []) as EmployeeItem[];
}
