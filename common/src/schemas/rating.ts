import { z } from "zod";

export const RatingMutationSchema = z.object({
  locationId: z.string(),
  value: z.number().int().min(1).max(5),
});

export type RatingMutationSchemaType = z.infer<typeof RatingMutationSchema>;

export const RatingSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  locationId: z.string(),
  value: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});