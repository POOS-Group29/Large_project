import { useMutation } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { MutationConfig, queryClient } from "../lib/react-query";
import { toast } from "react-toastify";

type UseCreateRatingOptions = {
  locationId: string;
  config?: MutationConfig<typeof API.rating.create>;
};

export const useCreateRating = ({
  locationId,
  config,
}: UseCreateRatingOptions) => {
  return useMutation({
    ...config,
    mutationKey: ["location", locationId],
    mutationFn: (data) => API.rating.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["location", locationId],
      });
      toast.success("Rating created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
