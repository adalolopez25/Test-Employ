import User from "@/db/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
  token: string;
}

function generateToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
}

function sanitizeUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = generateToken(user._id.toString(), user.role);

  return {
    user: sanitizeUser(user),
    token
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("USER_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user"
  });

  const token = generateToken(user._id.toString(), user.role);

  return {
    user: sanitizeUser(user),
    token
  };
}

export function logoutUser(cookieStore: { delete: (name: string) => void }) {

  cookieStore.delete("session");
  cookieStore.delete("user-role");

  return {
    message: "Conexión finalizada. Sesión cerrada."
  };
}