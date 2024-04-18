// api/retrieve.tsx
import { API } from '@/lib/common';
import { QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

export type UseRetrieveLocationOptions = {
	config?: QueryConfig<typeof API.location.retrieve>;
	locationId: string;
};

export const useRetrieveLocation = ({
	locationId,
	config,
}: UseRetrieveLocationOptions) => {
	return useQuery({
		...config,
		queryKey: ['location', locationId],
		queryFn: () => API.location.retrieve(locationId),
	});
};
