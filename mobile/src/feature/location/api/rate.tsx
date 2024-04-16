// api/rate.tsx
import { API } from '@/lib/common';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export type UseRateLocationOptions = {
  config?: MutationConfig<typeof API.rating.create>;
};

export const useRateLocation = ({
  config,
}: UseRateLocationOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ['rateLocation'],
    mutationFn: (ratingData) => API.rating.create(ratingData),
    onSuccess: () => {
      // Invalidate queries that might be affected by the new rating
      void queryClient.invalidateQueries({
        queryKey: ['location'],
      });
      console.log('Rating submitted successfully');
    },
    onError: (error) => {
      console.error('Error submitting rating:', error);
    },
  });
};
