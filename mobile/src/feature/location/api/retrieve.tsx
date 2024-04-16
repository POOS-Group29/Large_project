// api/retrieve.tsx
import { API } from '@/lib/common';
import { QueryConfig, queryClient } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

export type UseRetrieveLocationOptions = {
  config?: QueryConfig<typeof API.location.retrieve>;
  locationId: string; // assuming each location is fetched by an id
};

export const useRetrieveLocation = ({
  locationId,
  config,
}: UseRetrieveLocationOptions) => {
  return useQuery({
    ...config,
    queryKey: ['location', locationId],
    queryFn: () => API.location.retrieve(locationId),
    onSuccess: () => {
      console.log('Location data retrieved successfully');
    },
    onError: (error) => {
      console.error('Error retrieving location:', error);
    }
  });
};
