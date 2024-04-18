import { LocationListSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export default (instance: KyInstance) => async () => {
  const response = await instance
    .get("location/pending")
    .json();
  return LocationListSchema.parse(response);
};
