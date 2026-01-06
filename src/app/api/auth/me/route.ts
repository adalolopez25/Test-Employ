import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: userData, error } = await supabase.auth.getUser(session);

  if (error || !userData.user) {
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }

  return NextResponse.json({ user: userData.user });
}
