import mongoose, { Schema, model, models,Model } from "mongoose";

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
  password: { type: String, required: true }, 
  image: { type: String, default: "" },
  role : {
    type: String,
    enum : ["admin", "user"],
    default: "user"
  }
}, { timestamps: true });

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);


export default User;