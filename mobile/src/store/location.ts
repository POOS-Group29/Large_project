import { create } from 'zustand';
import type { LocationSchemaType } from '@/types';

interface LocationStorage {
	selectedLocation: LocationSchemaType | null;
	setSelectedLocation: (selectedLocation: LocationSchemaType | null) => void;
}

export const useLocationStorage = create<LocationStorage>()(set => ({
	selectedLocation: null,
	setSelectedLocation: selectedLocation => set({ selectedLocation }),
}));
