import { NextRequest, NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
import { MEDIA_TYPES, mediaFileError } from "@/lib/newsMedia";

export async function POST(request: NextRequest) {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "session" }, { status: 403 });
  if (request.headers.get("origin") && request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ error: "origin" }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 2048) return NextResponse.json({ error: "size" }, { status: 413 });
    const body = JSON.parse(raw);
    if (typeof body?.type !== "string" || !Number.isSafeInteger(body?.size)) return NextResponse.json({ error: "format" }, { status: 400 });
    const error = mediaFileError(body);
    if (error) return NextResponse.json({ error }, { status: 400 });
    const path = `media/${crypto.randomUUID()}.${MEDIA_TYPES[body.type].extension}`;
    const storage = createAdminClient().storage.from("news");
    const { data, error: uploadError } = await storage.createSignedUploadUrl(path);
    if (uploadError || !data) return NextResponse.json({ error: "uploadError" }, { status: 503 });
    const url = storage.getPublicUrl(path).data.publicUrl;
    const origin = new URL(url).origin;
    return NextResponse.json({ path, token: data.token, url, endpoint: `${origin.replace('.supabase.co', '.storage.supabase.co')}/storage/v1/upload/resumable` }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return NextResponse.json({ error: "uploadError" }, { status: 400 }); }
}
