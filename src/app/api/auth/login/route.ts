import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return NextResponse.json({ message: error.message }, { status: 401 });
  if (!data.user.email_confirmed_at) return NextResponse.json({ message: "Email not confirmed" }, { status: 401 });

  // Guardar sesión en cookie
  const res = NextResponse.json({ user: data.user });
  res.cookies.set({
    name: "session",
    value: data.session?.access_token!,
    httpOnly: true,
    path: "/",
  });

  return res;
}
