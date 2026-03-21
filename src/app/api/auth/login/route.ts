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

    // 1. ¿Existe el usuario?
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 2. ¿La contraseña es correcta? (Comparamos la plana con la encriptada)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 3. Generamos el Token (Igual que en el registro)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secreto_rick_morty",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email },
      token
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error en el inicio de sesión" }, { status: 500 });
  }
}