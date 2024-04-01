import { Document, Model, Schema, model } from "mongoose";

interface ILocation extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  location: {
    type: string;
    coordinates: number[];
  };

  difficultyRateCount: number;
  difficultyRateValue: number;
}

const locationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    difficultyRateCount: {
      type: Number,
      default: 0,
    },
    difficultyRateValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

locationSchema.index({ location: "2dsphere" }, { unique: true });

const Location: Model<ILocation> = model("Location", locationSchema);

export default Location;
