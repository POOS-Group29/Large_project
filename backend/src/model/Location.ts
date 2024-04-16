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
  types: string[];
  marineLife: string[];
  image: string | null;
  images: string[];
  maximumDepth: {
    metters: number;
    feet: number;
  } | null;
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
    types: {
      type: [String],
      default: [],
    },
    marineLife: {
      type: [String],
      default: [],
    },
    image: {
      type: String || null,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    maximumDepth: {
      metters: {
        type: Number,
      },
      feet: {
        type: Number,
      },
      type: Object || null,
      default: null,
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
