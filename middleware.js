import { NextResponse } from "next/server";

export function middleware(request) {
  const adminAuth = request.cookies.get("adminAuth")?.value;
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminAPI = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin/login";

  // 🔒 Protect all /admin and /api/admin routes (except /admin/login)
  if ((isAdminPage || isAdminAPI) && !isLoginPage && !adminAuth) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // ✅ Prevent logged-in admins from revisiting login page
  if (isLoginPage && adminAuth) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"], // ✅ protect both
};
