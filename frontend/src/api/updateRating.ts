import { useMutation } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { MutationConfig, queryClient } from "../lib/react-query";

type UseUpdateRatingOptions = {
  locationId: string;
  config?: MutationConfig<typeof API.rating.update>;
};

export const useUpdateRating = ({ locationId, config }: UseUpdateRatingOptions) => {
  return useMutation({
    ...config,
    mutationKey: ["location", locationId],
    mutationFn: (data) => API.rating.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["location", locationId],
      });
    },
  });
};
