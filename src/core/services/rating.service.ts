import Rating from "@/db/models/ratings";

export async function getUserRatings(userId: string) {
  return Rating.find({ userId });
}

export async function saveRating(data: any) {
  const filter = {
    characterId: Number(data.characterId),
    userId: String(data.userId)
  };

  const updateData = {
    rating: data.rating,
    isFavorite: data.isFavorite,
    name: data.name,
    image: data.image,
    species: data.species,
    status: data.status,
    gender: data.gender,
    origin: data.origin,
    location: data.location,
    type: data.type
  };

  return Rating.findOneAndUpdate(
    filter,
    { $set: updateData },
    { new: true, upsert: true, runValidators: true }
  );
}