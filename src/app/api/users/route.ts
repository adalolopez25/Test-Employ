import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth-utils";
import { requireAdmin } from "@/lib/auth-guards";
import { getAllUsers } from "@/core/services/user.service";

export async function GET(request: Request) {

  try {

    await dbConnect();

    const requester = getUserFromRequest(request);

    const guard = requireAdmin(requester);

    if (guard) return guard;

    const users = await getAllUsers();

    return NextResponse.json(users);

  } catch (error) {

    console.error("Error en API Users:", error);

    return NextResponse.json(
      { message: "Error al obtener usuarios" },
      { status: 500 }
    );
  }

}