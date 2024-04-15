import { UserSchema } from "@/schemas/auth";
import { KyInstance } from "ky";

export default (instance: KyInstance) => async () => {
  const response = await instance.get("auth/profile/").json();
  return UserSchema.parse(response);
};
