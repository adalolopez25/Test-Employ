import bcrypt from "bcryptjs";
import dbConnect from "../../lib/mongodb.ts";
import User from "../models/users.ts";

async function seedAdmin() {
  try {
    await dbConnect();

    const existingAdmin = await User.findOne({
      email: "admin@rickmorty.com",
    });

    if (existingAdmin) {
      console.log("Admin ya existe");
      process.exit();
    }

    const password = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@rickmorty.com",
      password,
      role: "admin",
      provider: "credentials",
    });

    console.log("Admin creado correctamente");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();