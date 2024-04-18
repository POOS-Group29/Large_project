// api/rate.tsx
import { API } from '@/lib/common';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export type UseRateLocationOptions = {
	config?: MutationConfig<typeof API.rating.create>;
};

export const useRateLocation = ({ config }: UseRateLocationOptions = {}) => {
	return useMutation({
		...config,
		mutationKey: ['location'],
		mutationFn: ratingData => API.rating.create(ratingData),
		onSuccess: () => {
			void queryClient.invalidateQueries();
		},
		onError: error => {
			Alert.alert('Error', error.message);
		},
	});
};
