import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const userRole = req.cookies.get("user-role")?.value;
  const { pathname } = req.nextUrl;

  const authRoutes = ["/login", "/register"];
  const privateRoutes = ["/perfil", "/profile", "/favoritos", "/favorites", "/dashboard"]; 
  const adminRoutes = ["/admin"];

  // CASO A: Usuario con sesión activa intenta ir al Login/Registro
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/characters", req.url));
  }

  // CASO B: Usuario SIN sesión intenta acceder a rutas privadas
  const isTryingToAccessPrivate = privateRoutes.some(route => pathname.startsWith(route));
  if (!token && isTryingToAccessPrivate) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // CASO C: Protección de Administrador
  const isTryingToAccessAdmin = adminRoutes.some(route => pathname.startsWith(route));
  if (isTryingToAccessAdmin) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/characters", req.url));
    }
  }

  return NextResponse.next();
}

// --- CONFIGURACIÓN DEL MATCHER ---
export const config = {
  matcher: [
    "/perfil/:path*", 
    "/favoritos/:path*", 
    "/favorites/:path*", 
    "/dashboard/:path*", 
    "/admin/:path*", 
    "/login", 
    "/register"
  ],
};