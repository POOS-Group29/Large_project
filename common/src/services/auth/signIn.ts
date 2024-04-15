import type { SignInRequestSchemaType } from "@/schemas/auth";
import { AuthResponseSchema } from "@/schemas/auth";
import type { KyInstance } from "ky";

export default (instance: KyInstance) =>
  async (props: SignInRequestSchemaType) => {
    const { email, password } = props;
    const response = await instance
      .post("auth/signin/", {
        body: JSON.stringify({ email, password }),
      })
      .json();
    return AuthResponseSchema.parse(response);
  };
