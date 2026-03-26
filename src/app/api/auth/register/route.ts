import { NextResponse } from "next/server";
import { registerUser } from "@/core/services/auth.service";
import dbConnect from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    console.log("📩 Petición de registro recibida");

    await dbConnect();
    console.log("✅ Conectado a MongoDB");

    const body = await req.json();
    console.log("📦 Body recibido:", body);

    const { name, email, password } = body;

    console.log("🧾 Datos extraídos:");
    console.log("name:", name);
    console.log("email:", email);
    console.log("password length:", password?.length);

    const result = await registerUser(name, email, password);

    console.log("📤 Resultado de registerUser:", result);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role
        }
      },
      { status: 201 }
    );

  } catch (error: any) {

    console.error("❌ ERROR EN REGISTRO:");
    console.error(error);
    console.error("Mensaje:", error?.message);
    console.error("Stack:", error?.stack);

    if (error.message === "USER_EXISTS") {
      console.log("⚠️ El usuario ya existe");

      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Fallo en la creación del usuario" },
      { status: 500 }
    );
  }
}