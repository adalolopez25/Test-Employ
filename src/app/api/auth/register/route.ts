import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/db/models/users";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  // 1. Usamos el casting para que TS reconozca los métodos de Mongoose
  const UserModel = User as Model<IUser>;
  
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    // 2. ¿Ya existe el correo? (Cambiado de 'users' a 'UserModel')
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
    }

    // 3. Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Guardamos al usuario (Cambiado de 'users' a 'UserModel')
    const newUser = await UserModel.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    // 5. Creamos el Token JWT
    const token = jwt.sign(
      { userId: newUser._id }, 
      process.env.JWT_SECRET || "secreto_rick_morty", 
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    }, { status: 201 });

  } catch (error) {
    console.error("Error en Registro:", error);
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 });
  }
}