import { useMutation } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { MutationConfig, queryClient } from "../lib/react-query";

type UseCreateRatingOptions = {
  locationId: string;
  config?: MutationConfig<typeof API.rating.create>;
};

export const useCreateRating = ({ locationId, config }: UseCreateRatingOptions) => {
  return useMutation({
    ...config,
    mutationKey: ["location", locationId],
    mutationFn: (data) => API.rating.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["location", locationId],
      });
    },
  });
};
