import User from "@/db/models/users";

export async function getAllUsers() {
  return User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();
}