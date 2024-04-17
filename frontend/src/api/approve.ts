import { useMutation } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { MutationConfig, queryClient } from "../lib/react-query";
import { toast } from "react-toastify";

type UseApproveLocationOptions = {
  config?: MutationConfig<typeof API.location.approve>;
};

export const useApproveLocation = ({
  config,
}: UseApproveLocationOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ["location"],
    mutationFn: (data) => API.location.approve(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["location"],
      });
      toast.success(`Location ${data.name} approved successfully`);
    },
  });
};
