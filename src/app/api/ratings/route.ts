import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getUserRatings, saveRating } from "@/core/services/rating.service";

export async function GET() {
  try {
    await dbConnect();

    const ratings = await getUserRatings("user_2026");

    return NextResponse.json(ratings);

  } catch {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const rating = await saveRating(body);

    return NextResponse.json({
      message: "Rating guardado con éxito",
      rating
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Error al guardar rating" }, { status: 500 });
  }
}