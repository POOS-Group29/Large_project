import { useMutation } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { MutationConfig, queryClient } from "../lib/react-query";
import { toast } from "react-toastify";

type UseDeleteLocationOptions = {
  config?: MutationConfig<typeof API.location.delete>;
};

export const useDeleteLocation = ({
  config,
}: UseDeleteLocationOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ["location"],
    mutationFn: async (locationId) => API.location.delete(locationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["location"],
      });
      toast.success("Location deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
