import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Rating from "@/db/models/ratings";

export async function GET() {
  try {
    await dbConnect();
    const interactions = await Rating.find({ userId: "user_2026" });
    return NextResponse.json(interactions);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { 
      characterId, 
      userId, 
      rating, 
      isFavorite, 
      name, 
      image, 
      species, 
      status, 
      gender, 
      origin, 
      location, 
      type 
    } = body;

    // Definimos el filtro y la actualización por separado para mayor claridad
    const filter = { characterId: Number(characterId), userId: String(userId) };
    
    const updateData = { 
      rating, 
      isFavorite, 
      name, 
      image, 
      species, 
      status, 
      gender, 
      origin, 
      location, 
      type 
    };

    // Usamos (Rating as any) para silenciar el error de TS si el modelo no tiene interfaz
    const updateRatings = await (Rating as any).findOneAndUpdate(
      filter,
      { $set: updateData }, // Usamos $set para asegurar que solo actualice estos campos
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ 
      message: "Rating guardado con éxito!", 
      rating: updateRatings 
    });

  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json({ error: "Error al guardar los datos" }, { status: 500 });
  }
}