import type { SignUpRequestSchemaType } from "@/schemas/auth";
import { AuthResponseSchema } from "@/schemas/auth";
import { KyInstance } from "ky";

export default (instance: KyInstance) =>
  async (props: SignUpRequestSchemaType) => {
    const { name, email, password } = props;
    const response = await instance
      .post("auth/signup/", {
        body: JSON.stringify({ email, password, name }),
      })
      .json();
    return AuthResponseSchema.parse(response);
  };
