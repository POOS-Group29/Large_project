import { ResponseMessageSchema } from "@/schemas/response";
import type { KyInstance } from "ky";

export default (instance: KyInstance) => async (email: string) => {
  const response = await instance
    .post("auth/forgot-password", { json: { email } })
    .json();
  return ResponseMessageSchema.parse(response);
};
