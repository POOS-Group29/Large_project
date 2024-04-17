import { useQuery } from "@tanstack/react-query";

import { API } from "../lib/ky";
import { ExtractFnReturnType, QueryConfig } from "../lib/react-query";

type QueryFnType = typeof API.location.list;

type useListLocationOptions = {
  long: number;
  lat: number;
  page?: number;
  config?: QueryConfig<QueryFnType>;
};

export const useListLocation = ({ long, lat, page = 1, config }: useListLocationOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["location"],
    queryFn: () => API.location.list({
      long,
      lat,
      page,
    }),
  });
};