import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/db/models/users";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// app/api/auth/register/route.ts
// ... (tus imports igual)

export async function POST(request: Request) {
  const UserModel = User as Model<IUser>;
  
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({ 
      name, 
      email, 
      password: hashedPassword,
      role: "user" // Asegúrate de asignar un rol por defecto
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: "7d" }
    );

    // --- AQUÍ EL CAMBIO CRUCIAL ---
    const response = NextResponse.json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      token
    }, { status: 201 });

    // Seteamos la cookie para que el Middleware la vea inmediatamente
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // También la del rol
    response.cookies.set("user-role", "user", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Error en Registro:", error);
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 });
  }
}