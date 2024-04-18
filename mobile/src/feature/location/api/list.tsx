import { useQuery } from '@tanstack/react-query';

import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { API } from '@/lib/common';

type QueryFnType = typeof API.location.list;

type UseListLocationOptions = {
	long: number;
	lat: number;
	page?: number;
	config?: QueryConfig<QueryFnType>;
};

export const useListLocation = (props: UseListLocationOptions) => {
	const { config, long, lat, page } = props;
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['location', 'list', long, lat, page],
		queryFn: () =>
			API.location.list({
				long,
				lat,
				page,
			}),
	});
};
