import { findSiteResults } from "@/lib/siteSearch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const results = await findSiteResults(searchParams.get("locale") || "ru", searchParams.get("q") || "", 5);
  return Response.json({ results }, { headers: { "Cache-Control": "public, max-age=30, s-maxage=60" } });
}
