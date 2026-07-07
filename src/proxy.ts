import { NextRequest, NextResponse } from "next/server";

const MEMBER_PATHS = ["/membership/dashboard", "/membership/profile"];
const ADMIN_PATHS  = ["/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const needsAuth =
    MEMBER_PATHS.some(p => pathname.startsWith(p)) ||
    ADMIN_PATHS.some(p => pathname.startsWith(p));

  if (needsAuth && !token) {
    const loginUrl = new URL("/ember-login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/membership/:path*", "/admin/:path*"],
};
