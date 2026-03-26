import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //  Obtener sesión real de NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const authRoutes = ["/login", "/register"];
  const privateRoutes = ["/perfil", "/profile", "/favoritos", "/favorites", "/dashboard"];
  const adminRoutes = ["/admin"];

  // CASO A: Usuario logueado va a login/register
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/characters", req.url));
  }

  // CASO B: Usuario NO logueado a rutas privadas
  const isPrivate = privateRoutes.some(route => pathname.startsWith(route));
  if (!token && isPrivate) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // CASO C: Admin
  const isAdmin = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdmin) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    //  aquí viene lo importante
    if ((token as any).role !== "admin") {
      return NextResponse.redirect(new URL("/characters", req.url));
    }
  }

  return NextResponse.next();
}

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