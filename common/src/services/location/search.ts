import { LocationListSchema } from "@/schemas/location";
import type { KyInstance } from "ky";

export interface ListLocationProps {
  name: string;
}

export default (instance: KyInstance) => async (props: ListLocationProps) => {
  const { name } = props;
  const response = await instance.get(`location/search?name=${name}`).json();
  return LocationListSchema.parse(response);
};
