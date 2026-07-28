import "server-only";
import { createClient } from "@supabase/supabase-js";

// Project URL is public (it is already used by the browser client). Keeping the
// verified server URL here prevents a stale NEXT_PUBLIC_* build value from
// sending protected student API routes to an old Supabase project on Netlify.
const STUDENT_SERVER_SUPABASE_URL =
  "https://cnattbgholeiihfhbfzd.supabase.co";

export function createAdminClient() {
  const url =
    process.env.SUPABASE_SERVER_URL || STUDENT_SERVER_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("Supabase server environment is not configured");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
