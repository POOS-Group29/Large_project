import { useAuthStorage } from '@/store/auth';
import createAPI from '@xhoantran/common';

export const API = createAPI({
	prefixUrl: 'https://api.cop4331.xhoantran.com/api/',
	getAuthToken: () => useAuthStorage.getState().token || '',
});
