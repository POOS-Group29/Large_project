import createAPI from '@xhoantran/common';
import {useAuthStorage} from '@/store/auth';

export const API = createAPI({
    prefixUrl: 'https://api.cop4331.xhoantran.com/api/',
    getAuthToken: () => useAuthStorage.getState().token || '',
});