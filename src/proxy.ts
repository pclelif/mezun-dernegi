import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminUser } from "@/lib/supabase/admin-auth";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return false;
  if (url.includes("placeholder.supabase.co") || key === "placeholder_key") return false;
  return true;
}

function clearLegacyAdminCookie(response: NextResponse) {
  response.cookies.set("admin_session", "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;
  const isLogin = pathname === "/admin/login";
  const isAdminPath = pathname.startsWith("/admin");

  // Eski/sahte client-side admin_session çerezini her admin isteğinde temizle.
  if (isAdminPath && request.cookies.has("admin_session")) {
    clearLegacyAdminCookie(response);
  }

  if (!isAdminPath) {
    return response;
  }

  if (!isSupabaseConfigured()) {
    if (!isLogin) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      const redirect = NextResponse.redirect(loginUrl);
      clearLegacyAdminCookie(redirect);
      return redirect;
    }
    return response;
  }

  let user = null;

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
            if (request.cookies.has("admin_session")) {
              clearLegacyAdminCookie(response);
            }
          },
        },
      },
    );

    // getSession yerine getUser: JWT sunucuda doğrulanır; sahte çerez geçmez.
    const userRes = await supabase.auth.getUser();
    user = userRes.data?.user ?? null;
  } catch {
    user = null;
  }

  const isAdmin = isAdminUser(user);

  if (!isAdmin && !isLogin) {
    if (pathname.startsWith("/api/admin")) {
      const unauthorized = NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
      clearLegacyAdminCookie(unauthorized);
      return unauthorized;
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    const redirect = NextResponse.redirect(loginUrl);
    clearLegacyAdminCookie(redirect);
    return redirect;
  }

  if (isAdmin && isLogin) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    const redirect = NextResponse.redirect(adminUrl);
    clearLegacyAdminCookie(redirect);
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
