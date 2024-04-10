import { LocationMutationSchemaType, LocationSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export default (instance: KyInstance) =>
  async (location: LocationMutationSchemaType) => {
    const response = await instance.post("location", { json: location }).json();
    return LocationSchema.parse(response);
  };
