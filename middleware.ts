// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Giriş yapmamış kullanıcıları engelle
  if (!token) {
    return NextResponse.redirect(new URL("/auth/error", req.url));
  }

  // 2. Admin gerektiren sayfalar için kontrol
  const adminProtectedRoutes = ["/dashboard/users"];

  if (adminProtectedRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
