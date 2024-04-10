import { LocationSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export default (instance: KyInstance) => async (id: string) => {
  const response = await instance.get(`location/${id}`).json();
  return LocationSchema.parse(response);
};
