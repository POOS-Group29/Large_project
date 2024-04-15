import { z } from "zod";

export const LocationMutationSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  long: z.number(),
  lat: z.number(),
});

export type LocationMutationSchemaType = z.infer<typeof LocationMutationSchema>;

export const LocationSchema = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  location: z.object({
    type: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  types: z.array(z.string()),
  marineLife: z.array(z.string()),
  image: z.string().nullable(),
  maximumDepth: z
    .object({
      metters: z.number(),
      feet: z.number(),
    })
    .nullable(),
  difficultyRateCount: z.number(),
  difficultyRateValue: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type LocationSchemaType = z.infer<typeof LocationSchema>;

export const LocationListSchema = z.array(LocationSchema);
