import mongoose, { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Aquí irá la versión encriptada
  image: { type: String, default: "" },
}, { timestamps: true });

export default models.User || model("User", UserSchema);