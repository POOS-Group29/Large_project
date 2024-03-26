import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';

export default ({ layout, backgrounds, fonts, borders }: ComponentTheme) => {
	return {
		bgImage: {
			top: -5,
			bottom: -5,
			left: -5,
			right: -5,
			...layout.absolute,
		},
		buttonCircle: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.purple100,
			...fonts.gray400,
			height: 70,
			width: 70,
			borderRadius: 35,
		},
		buttonPrimary: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.blue600,
			height: 48,
			width: '100%',
			borderRadius: 16,
		},
		buttonSecondary: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.white,
			height: 48,
			width: '100%',
			borderRadius: 16,
		},
		circle250: {
			borderRadius: 140,
			height: 250,
			width: 250,
		},
	} as const satisfies Record<string, ImageStyle | TextStyle | ViewStyle>;
};
