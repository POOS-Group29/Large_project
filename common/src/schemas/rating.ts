import { z } from "zod";

export const RatingMutationSchema = z.object({
  locationId: z.string(),
  value: z.number().int().min(1).max(5),
});

export type RatingMutationSchemaType = z.infer<typeof RatingMutationSchema>;