import { ResponseMessageSchema } from "@/schemas/response";
import type { KyInstance } from "ky";

export default (instance: KyInstance) => async (id: string) => {
  const response = await instance.delete(`location/${id}`).json();
  return ResponseMessageSchema.parse(response);
};
