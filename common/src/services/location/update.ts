import { LocationMutationSchemaType, LocationSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export default (instance: KyInstance) =>
  async (id: string, location: LocationMutationSchemaType) => {
    const response = await instance
      .put(`location/${id}`, { json: location })
      .json();
    return LocationSchema.parse(response);
  };
