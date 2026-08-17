import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.app_metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const userId = String(body.userId || "");
    const responsibleLabel = String(body.responsibleLabel || "").trim();
    if (!userId || !responsibleLabel) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const admin = createAdminClient();
    const { data, error } = await admin.from("accreditation_v3_indicators")
      .update({ responsible_user_id: userId, assignment_source: "manual", assignment_role_key: null })
      .eq("responsible_label", responsibleLabel)
      .select("id");
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, count: data?.length || 0 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
