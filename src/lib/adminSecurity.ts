import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminMfa() {
  const supabase = await createClient();
  const [{ data: { user } }, { data: assurance }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
  ]);
  if (!user || user.app_metadata?.role !== "admin" || assurance?.currentLevel !== "aal2") return null;
  return { supabase, user };
}
