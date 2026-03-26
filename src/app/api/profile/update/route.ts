import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/db/models/users";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, password } = await req.json();
  await dbConnect();

  const updateData: any = { name, email };

  if (password && password.length > 0) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: updateData }
  );

  return NextResponse.json({ success: true });
}