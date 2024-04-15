import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthResponseSchemaType } from '@/types/schemas/auth';
import { mmkvZustandStorage } from './instance';

interface AuthStorage {
	user: AuthResponseSchemaType['user'] | null;
	token: AuthResponseSchemaType['token'] | null;
	isAuthorized: boolean;
	setUser: (user: AuthResponseSchemaType['user']) => void;
	setToken: (token: AuthResponseSchemaType['token']) => void;
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
