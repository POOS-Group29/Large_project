import type { RatingMutationSchemaType } from "@/schemas/rating";
import { ResponseMessageSchema } from "@/schemas/response";
import type { KyInstance } from "ky";

export default (instance: KyInstance) =>
  async (rating: RatingMutationSchemaType) => {
    const response = await instance
      .post("rating/difficulty/", { json: rating })
      .json();
    return ResponseMessageSchema.parse(response);
  };
