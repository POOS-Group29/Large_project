import { API } from '@/lib/common';
import { QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

export type UseSearchLocationOptions = {
	config?: QueryConfig<typeof API.location.search>;
	name: string; // Search query parameter for the location name
};

export const useSearchLocation = ({
	name,
	config,
}: UseSearchLocationOptions) => {
	return useQuery({
		...config,
		queryKey: ['location', 'search', name],
		queryFn: () => API.location.search({ name }),
	});
};
