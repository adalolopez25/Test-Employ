import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { password } = await req.json();

  console.log("PASSWORD FRONT:", password);
  console.log("PASSWORD ENV:", process.env.PROTECTED_SECRET_KEY);

  if (password === process.env.PROTECTED_SECRET_KEY) {
    (await cookies()).set("auth", "true");
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 401 });
}