import { API } from '@/lib/common';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export type UseUpdateRatingOptions = {
	config?: MutationConfig<typeof API.rating.update>;
};

export const useUpdateRating = ({ config }: UseUpdateRatingOptions = {}) => {
	return useMutation({
		...config,
		mutationKey: ['location'],
		mutationFn: updateData => API.rating.update(updateData),
		onSuccess: () => {
			void queryClient.invalidateQueries();
		},
		onError: error => {
			Alert.alert('Error', error.message);
		},
	});
};
