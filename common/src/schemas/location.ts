import { z } from "zod";
import { RatingSchema } from "./rating";

export const LocationMutationSchema = z.object({
  name: z.string(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  zip: z.string().nullish(),
  marineLife: z.array(z.string()).nullish(),
  types: z.array(z.string()).nullish(),
  long: z.number(),
  lat: z.number(),
});

export type LocationMutationSchemaType = z.infer<typeof LocationMutationSchema>;

export const LocationSchema = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  zip: z.string().nullish(),
  location: z.object({
    type: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  types: z.array(z.string()),
  marineLife: z.array(z.string()),
  image: z.string().nullish(),
  images: z.array(z.string()),
  maximumDepth: z
    .object({
      metters: z.number(),
      feet: z.number(),
    })
    .nullish(),
  userRating: RatingSchema.nullish(),
  difficultyRateCount: z.number(),
  difficultyRateValue: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type LocationSchemaType = z.infer<typeof LocationSchema>;

export const LocationListSchema = z.array(LocationSchema);
