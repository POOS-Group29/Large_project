import type { AuthResponseSchemaType } from '@/types/schemas/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvZustandStorage } from './instance';

interface AuthStorage {
	user: AuthResponseSchemaType['user'] | null;
	token: AuthResponseSchemaType['token'] | null;
	isAuthorized: boolean;
	setUser: (user: AuthResponseSchemaType['user'] | null) => void;
	setToken: (token: AuthResponseSchemaType['token'] | null) => void;
	setIsAuthorized: (isAuthorized: boolean) => void;
}

export const useAuthStorage = create<AuthStorage>()(
	persist(
		set => ({
			user: null,
			setUser: user => set({ user }),
			token: null,
			setToken: token => set({ token }),
			isAuthorized: false,
			setIsAuthorized: isAuthorized => set({ isAuthorized }),
		}),
		{
			name: 'authStorage',
			storage: createJSONStorage(() => mmkvZustandStorage),
		},
	),
);
