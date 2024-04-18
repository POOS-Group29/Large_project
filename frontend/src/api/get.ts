import { useQuery } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { ExtractFnReturnType, QueryConfig } from "../lib/react-query";

type QueryFnType = typeof API.location.retrieve;

type useGetLocationOptions = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useGetLocation = ({ id, config }: useGetLocationOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["location", id],
    queryFn: () => API.location.retrieve(id),
  });
};
