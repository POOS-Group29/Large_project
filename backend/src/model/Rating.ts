import { Document, Model, Schema, model } from "mongoose";

interface IRating extends Document {
  userId: Schema.Types.ObjectId;
  locationId: Schema.Types.ObjectId;
  value: number;
}

const ratingSchema = new Schema<IRating>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

ratingSchema.index({ userId: 1, locationId: 1 }, { unique: true });

export const DifficultyRating: Model<IRating> = model(
  "DifficultyRating",
  ratingSchema
);
