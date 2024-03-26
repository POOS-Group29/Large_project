import { useAuthStorage } from '@/store/auth';
import ky from 'ky';

const prefixUrl = 'https://api.cop4331.xhoantran.com/';

export const instance = ky.extend({
	prefixUrl,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Environment: 'prod',
	},
});

export const authenticatedInstance = instance.extend({
	hooks: {
		beforeRequest: [
			request => {
				const { token } = useAuthStorage.getState();
				if (!token) {
					throw new Error('Token is not available');
				}
				request.headers.set('Authorization', `Bearer ${token}`);
			},
		],
	},
});
