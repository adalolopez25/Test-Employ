import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cliente Supabase con service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, password, username } = await req.json();

  // 1️⃣ Crear usuario en Supabase Auth
  const { data: userData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false, // usuario necesita confirmar
  });

  if (authError) return NextResponse.json({ message: authError.message }, { status: 400 });
  if (!userData.user) return NextResponse.json({ message: "Error creating user" }, { status: 500 });

  // 2️⃣ Crear perfil en tabla "profiles"
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: userData.user.id, username });

  if (profileError) return NextResponse.json({ message: profileError.message }, { status: 400 });

  // 3️⃣ Supabase envía el email de confirmación automáticamente
  // 🔹 No necesitas generateLink manual, con service_role + email_confirm false y SMTP configurado, Supabase enviará el email

  return NextResponse.json({ message: "Usuario creado. Revisa tu correo para confirmar." });
}
