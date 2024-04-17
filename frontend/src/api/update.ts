import { useMutation } from "@tanstack/react-query";
import { LocationSchemaType } from "@xhoantran/common";
import { toast } from "react-toastify";

import { authInstance } from "../config/ky";
import { MutationConfig, queryClient } from "../lib/react-query";

interface ILocation {
  _id: string;
  name?: string;
  long?: number;
  lat?: number;
  types?: string[];
  marineLife?: string[];
  maximumDepth?: {
    metters: number;
    feet: number;
  } | null;
}

export const updateLocation = async (
  location: ILocation
): Promise<LocationSchemaType> => {
  const { _id, ...json } = location;

  const res = await authInstance.put(`location/${_id}`, {
    json,
  });
  return res.json();
};

type UseUpdateLocationOptions = {
  config?: MutationConfig<typeof updateLocation>;
};

export const useUpdateLocation = ({
  config,
}: UseUpdateLocationOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ["location"],
    mutationFn: (location) => updateLocation(location),
    onSuccess: (_, location) => {
      queryClient.invalidateQueries({
        queryKey: ["location", location._id],
      });
      toast.success("Location updated successfully");
    },
  });
};
