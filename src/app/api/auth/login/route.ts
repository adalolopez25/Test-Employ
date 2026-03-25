import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/db/models/users";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const UserModel = User as Model<IUser>;

  try {
    await dbConnect();
    const { email, password } = await request.json();

    // 1. ¿Existe el usuario? (Traemos el role también)
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 2. ¿La contraseña es correcta?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 3. Generamos el Token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Guardamos el rol dentro del token tmb
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // 4. CREAMOS LA RESPUESTA
    const response = NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    }, { status: 200 });

    // 5. SETEAMOS LAS COOKIES PARA EL MIDDLEWARE
    // Cookie de Sesión (Protegida para que JS no la toque)
    response.cookies.set("session", token, {
      httpOnly: true, // Seguridad contra XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/",
    });

    const roleValue : string = user.role.toString();
    // Cookie de Rol (Para que el Middleware decida rápido)
    response.cookies.set("user-role", roleValue, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    }); 

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el inicio de sesión" }, { status: 500 });
  }
}