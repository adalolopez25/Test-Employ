import mongoose, { Schema, model, models, Model } from "mongoose";

export interface IRating extends mongoose.Document {
  characterId: number;
  userId: string;
  rating: number;
  isFavorite: boolean;
  name: string;
  image: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  status: string;
  type: string;
}

const RatingSchema = new Schema<IRating>({
  characterId: { type: Number, required: true },
  userId: { type: String, required: true, default: "user_2026" },
  rating: { type: Number, default: 0, min: 0, max: 5 }, 
  isFavorite: { type: Boolean, default: false },
  name: { type: String, required: true },
  image: { type: String, required: true },
  species: { type: String, required: true },
  gender: { type: String, required: true },
  origin: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: false, default: "" }, 
}, { timestamps: true });


const Rating: Model<IRating> = models.Rating || model<IRating>("Rating", RatingSchema);

export default Rating;