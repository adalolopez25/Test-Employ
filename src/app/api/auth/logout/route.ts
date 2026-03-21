import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // 1. Borramos la sesión principal
  cookieStore.delete("session");

  // 2. IMPORTANTE: También borramos el rol para que el Middleware 
  // no se confunda si otro usuario inicia sesión en la misma PC
  cookieStore.delete("user-role");

  // 3. Opcional: Podrías añadir un "clear-site-data" en los headers 
  // para una limpieza profunda de caché si fuera necesario.
  
  return NextResponse.json(
    { message: "Conexión finalizada. Sesión cerrada." },
    { status: 200 }
  );
}