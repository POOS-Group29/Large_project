import { useQuery } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { ExtractFnReturnType, QueryConfig } from "../lib/react-query";

type QueryFnType = typeof API.location.listPending;

type useListPendingLocationOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useListPendingLocation = ({ config }: useListPendingLocationOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["location"],
    queryFn: async () => API.location.listPending(),
  });
};
