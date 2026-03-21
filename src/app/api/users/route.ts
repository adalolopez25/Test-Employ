import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User, { IUser } from "@/db/models/users";
import { QueryFilter } from "mongoose";

// Helper para obtener el usuario desde el middleware
const getUserFromRequest = (request: Request): IUser | null => {
  const userHeader = request.headers.get("x-user");
  if (!userHeader) return null;
  try {
    return JSON.parse(userHeader) as IUser;
  } catch {
    return null;
  }
};

export async function GET(request: Request) {
  try {
    // 1️⃣ Conectar a la BD
    await connectMongoDB();

    // 2️⃣ Obtener usuario autenticado desde middleware
    const requester = getUserFromRequest(request);
    if (!requester) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    if (requester.role !== "admin") {
      return NextResponse.json(
        { message: "Acceso denegado: se requiere rol admin" },
        { status: 403 }
      );
    }

    // 4️⃣ Query segura, tipada
    const filter: QueryFilter<IUser> = {}; 
    const users = await User.find(filter)
      .select("-password") 
      .sort({ createdAt: -1 })
      .lean(); 

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error en API Users:", error);
    return NextResponse.json(
      { message: "Fallo en la sincronización de la base de datos" },
      { status: 500 }
    );
  }
}