import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  // Rutas públicas
  const publicRoutes = ["/", "/login", "/blocked"];
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // No hay token → redirige a login
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  // Validamos JWT
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protección por rol
  if (pathname.startsWith("/admin") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Aplica middleware a todas las rutas excepto recursos estáticos
export const config = {
  matcher: ["/((?!_next|favicon.ico|api|imagenes|videos).*)"],
};