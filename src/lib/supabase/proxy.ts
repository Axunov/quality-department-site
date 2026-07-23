import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(ru|uz|en)(\/|$)/);
  const locale = localeMatch?.[1] || "ru";
  const adminPrefix = `/${locale}/admin`;
  const loginPath = `${adminPrefix}/login`;
  const isAdminRoute =
    pathname === adminPrefix || pathname.startsWith(`${adminPrefix}/`);

  if (!isAdminRoute) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = pathname === loginPath;
  const isAdmin = user?.app_metadata?.role === "admin";

  if (isAdminRoute && !isLoginPage && (!user || !isAdmin)) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set("redirect", pathname);

    if (user && !isAdmin) {
      url.searchParams.set("error", "forbidden");
    }

    return NextResponse.redirect(url);
  }

  if (isLoginPage && user && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = adminPrefix;
    url.search = "";

    return NextResponse.redirect(url);
  }

  return response;
}
