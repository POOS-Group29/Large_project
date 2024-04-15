import { API } from '@/lib/common';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

type UseCreateLocationOptions = {
	config?: MutationConfig<typeof API.location.create>;
};

export const useCreateLocation = ({
	config,
}: UseCreateLocationOptions = {}) => {
	return useMutation({
		...config,
		mutationKey: ['location'],
		mutationFn: data => API.location.create(data),
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: ['location'],
			});
		},
	});
};
