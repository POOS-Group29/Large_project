import { DarkTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';

export const tailwindColors = {
	gray50: '#f9fafb',
	gray100: '#f3f4f6',
	gray200: '#e5e7eb',
	gray300: '#d1d5db',
	gray400: '#9ca3af',
	gray500: '#6b7280',
	gray600: '#4b5563',
	gray700: '#374151',
	gray800: '#1f2937',
	gray900: '#111827',
	gray950: '#030712',

	blue50: '#eff6ff',
	blue100: '#dbeafe',
	blue200: '#bfdbfe',
	blue300: '#93c5fd',
	blue400: '#60a5fa',
	blue500: '#3b82f6',
	blue600: '#2563eb',
	blue700: '#1d4ed8',
	blue800: '#1e40af',
	blue900: '#1e3a8a',
};

const colorsLight = {
	white: '#FFFFFF',
	red500: '#C13333',

	...tailwindColors,

	purple500: '#44427D',
	purple100: '#E1E1EF',
	purple50: '#1B1A23',
} as const;

const colorsDark = {
	white: '#FFFFFF',
	red500: '#C13333',

	...tailwindColors,

	purple500: '#A6A4F0',
	purple100: '#252732',
	purple50: '#1B1A23',
} as const;

const sizes = [4, 8, 12, 16, 24, 32, 40, 80] as const;

export const config = {
	colors: colorsLight,
	fonts: {
		sizes,
		colors: colorsLight,
	},
	gutters: sizes,
	backgrounds: colorsLight,
	borders: {
		widths: [1, 2],
		radius: [4, 16],
		colors: colorsLight,
	},
	navigationColors: {
		...DarkTheme.colors,
		background: colorsLight.gray50,
		card: colorsLight.gray50,
	},
	variants: {
		dark: {
			colors: colorsDark,
			fonts: {
				colors: colorsDark,
			},
			backgrounds: colorsDark,
			navigationColors: {
				...DarkTheme.colors,
				background: colorsDark.purple50,
				card: colorsDark.purple50,
			},
		},
	},
} as const satisfies ThemeConfiguration;
