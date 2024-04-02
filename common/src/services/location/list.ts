import { LocationListSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export interface ListLocationProps {
  long: number;
  lat: number;
  page?: number;
}

export default (instance: KyInstance) => async (props: ListLocationProps) => {
  const { long, lat, page } = props;
  const response = await instance
    .get(`location/?long=${long}&lat=${lat}&page=${page || 1}`)
    .json();
  return LocationListSchema.parse(response);
};
