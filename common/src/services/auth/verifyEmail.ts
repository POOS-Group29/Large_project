import { ResponseMessageSchema } from "@/schemas/response";
import type { KyInstance } from "ky";

export interface VerifyEmailProps {
  email: string;
  token: string;
}

export default (instance: KyInstance) => async (props: VerifyEmailProps) => {
  const { email, token } = props;
  const response = await instance
    .post("auth/verify-email/", { json: { email, token } })
    .json();
  return ResponseMessageSchema.parse(response);
};
