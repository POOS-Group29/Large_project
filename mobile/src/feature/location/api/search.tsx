import { API } from '@/lib/common';
import { QueryConfig, queryClient } from '@/lib/react-query';
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
    queryKey: ['location-search', name],
    queryFn: () => API.location.search({name}), // Fix: Pass an object with the name property
    onSuccess: () => {
      console.log('Location search completed successfully');
    },
    onError: (error) => {
      console.error('Error during location search:', error);
    }
  });
};
