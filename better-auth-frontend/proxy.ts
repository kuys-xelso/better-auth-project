import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request); // Helper from better-auth

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && sessionCookie) {
    return NextResponse.next(); // Or redirect to dashboard if already logged in
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
