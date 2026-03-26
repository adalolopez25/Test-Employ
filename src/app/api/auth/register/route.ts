import { NextResponse } from "next/server";
import { registerUser } from "@/core/services/auth.service";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const { user, token } = await registerUser(name, email, password);

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("user-role", user.role, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      user,
    });

  } catch (error: any) {

    if (error.message === "USER_EXISTS") {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}