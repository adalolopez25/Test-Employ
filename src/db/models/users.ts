import mongoose, { Schema, model, models } from "mongoose";
import { StringDecoder } from "node:string_decoder";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role : "admin" | "user"
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Aquí irá la versión encriptada
  image: { type: String, default: "" },
  role : {
    type: String,
    enum : ["admin", "user"],
    default: "user"
  }
}, { timestamps: true });

export default models.User || model("User", UserSchema);