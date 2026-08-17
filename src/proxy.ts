import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AdminRoutes } from "./app/routes";

export function proxy(request: NextRequest) {
  const hasRefreshToken = request.cookies.has("refresh_token");

  const isAuthPage = request.nextUrl.pathname.startsWith(AdminRoutes.login);
  const isAdminRoute = request.nextUrl.pathname.startsWith(AdminRoutes.home);

  if (isAdminRoute && !isAuthPage && !hasRefreshToken) {
    return NextResponse.redirect(new URL(AdminRoutes.login, request.url));
  }

  if (isAuthPage && hasRefreshToken) {
    return NextResponse.redirect(new URL(AdminRoutes.home, request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
