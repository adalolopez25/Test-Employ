import { NextResponse } from "next/server";

export function requireAdmin(user: any) {

  if (!user) {
    return NextResponse.json(
      { message: "No autorizado" },
      { status: 401 }
    );
  }

  if (user.role !== "admin") {
    return NextResponse.json(
      { message: "Acceso denegado: se requiere rol admin" },
      { status: 403 }
    );
  }

  return null;
}