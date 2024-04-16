// api/updateLocation.tsx
import { API } from '@/lib/common';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export type UseUpdateLocationOptions = {
  config?: MutationConfig<typeof API.rating.update>;
};

export const useUpdateLocation = ({
  config,
}: UseUpdateLocationOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ['updateLocation'],
    mutationFn: (updateData) => API.rating.update(updateData),
    onSuccess: () => {
      // Optionally, invalidate queries related to the location data
      // For example, if updating the location affects any queries with 'location' as part of their keys
      void queryClient.invalidateQueries({
        queryKey: ['location'],
      });

      console.log('Location data updated successfully');
    },
    onError: (error) => {
      console.error('Error updating location:', error);
    },
  });
};
