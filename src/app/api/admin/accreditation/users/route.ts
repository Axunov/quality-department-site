import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { internalEmail, normalizeUsername } from "@/lib/accreditation/localization";

const allowedRoles = new Set(["department_head", "quality_office", "director"]);

export async function POST(request: Request) {
  try {
    if (!await requireAdminMfa()) return NextResponse.json({ error: "MFA required" }, { status: 403 });
    const body = await request.json();
    const username = normalizeUsername(String(body.username || ""));
    const recoveryEmail = String(body.email || "").trim().toLowerCase() || null;
    const email = internalEmail(username);
    const password = String(body.password || "");
    const fullName = String(body.fullName || "").trim();
    const jobTitle = String(body.jobTitle || "").trim() || null;
    const positionKey = String(body.positionKey || "").trim();
    const role = String(body.role || "department_head");
    if (username.length < 3 || password.length < 8 || !fullName || !positionKey || !allowedRoles.has(role)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const admin = createAdminClient();
    const {data:existing}=await admin.from("accreditation_v3_profiles").select("user_id").ilike("username",username).maybeSingle();
    if(existing)return NextResponse.json({error:"Username already exists"},{status:409});
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, app_metadata: { role: "accreditation" },
    });
    if (createError || !created.user) {
      return NextResponse.json({ error: createError?.message || "User creation failed" }, { status: 400 });
    }
    const { error: profileError } = await admin.from("accreditation_v3_profiles").upsert({
      user_id: created.user.id, full_name: fullName, job_title: jobTitle, role, requested_role: role, username,
      recovery_email: recoveryEmail, phone: String(body.phone||"").trim()||null, must_change_password: true,
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
