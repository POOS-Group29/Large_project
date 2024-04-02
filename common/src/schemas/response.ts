import { z } from "zod";

export const ResponseMessageSchema = z.object({
  message: z.string(),
});
