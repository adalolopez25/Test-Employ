import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(pathname);

  const isAdminRoute = pathname.startsWith("/admin");

  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/favorites");

  // Usuario logueado no puede ir a login/register
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/characters", req.url));
  }

  // Usuario no logueado intenta ruta privada
  if (!isAuthenticated && (isPrivateRoute || isAdminRoute)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Solo admin puede entrar a /admin
  if (isAuthenticated && isAdminRoute) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/favorites/:path*",
    "/admin/:path*",
    "/login",
    "/register"
  ],
};