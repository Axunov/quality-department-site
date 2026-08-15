import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedRoles = new Set(["department_head", "quality_office", "director"]);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.app_metadata?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const fullName = String(body.fullName || "").trim();
    const jobTitle = String(body.jobTitle || "").trim() || null;
    const positionKey = String(body.positionKey || "").trim();
    const role = String(body.role || "department_head");
    if (!email || password.length < 8 || !fullName || !positionKey || !allowedRoles.has(role)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const admin = createAdminClient();
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, app_metadata: { role: "accreditation" },
    });
    if (createError || !created.user) {
      return NextResponse.json({ error: createError?.message || "User creation failed" }, { status: 400 });
    }
    const { error: profileError } = await admin.from("accreditation_v3_profiles").upsert({
      user_id: created.user.id, full_name: fullName, job_title: jobTitle, role, requested_role: role,
      position_key: positionKey, approval_status: "approved", approved_at: new Date().toISOString(), is_active: true,
    });
    if (profileError) {
      await admin.auth.admin.deleteUser(created.user.id);
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true, userId: created.user.id });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
