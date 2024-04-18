import { LocationSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export default (instance: KyInstance) =>
  async (locationId: string | number) => {
    const response = await instance
      .post(`location/approve/${locationId}`)
      .json();
    return LocationSchema.parse(response);
  };
