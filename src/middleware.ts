import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const userRole = req.cookies.get("user-role")?.value; // 1. Nueva cookie de rol
  const { pathname } = req.nextUrl;

  // REGLA 1: Si no hay sesión, nadie entra a zonas privadas
  if (!session && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  // REGLA 2: Si intenta entrar a /admin pero no es 'admin' en la cookie
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    // Lo mandamos al dashboard normal o a una página de "No autorizado"
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // 2. Expandimos el matcher para cubrir ambas rutas
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/users/:path*"],
};