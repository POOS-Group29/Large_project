import { tailwindColors } from '@/theme/_config';
import useTheme from '@/theme/hooks/useTheme';
import {
	ActivityIndicator,
	StyleProp,
	Text,
	TextStyle,
	TouchableOpacity,
} from 'react-native';

interface ButtonProps {
	title: string;
	onPress: () => void;
	variant?: 'primary' | 'secondary';
	buttonStyle?: StyleProp<TextStyle>;
	textStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
	loading?: boolean;
}

export function Button(props: ButtonProps) {
	const { fonts, components, backgrounds, ...theme } = useTheme();
	const { title, onPress, variant, buttonStyle, textStyle, disabled, loading } =
		props;

	const defaultButtonStyle = [
		variant === 'primary'
			? components.buttonPrimary
			: components.buttonSecondary,
		// eslint-disable-next-line no-nested-ternary
		disabled || loading
			? theme.variant === 'default'
				? backgrounds.gray300
				: backgrounds.gray700
			: null,
	];

	const defaultTextStyle = [
		fonts.size_16,
		fonts.bold,
		variant === 'primary' ? fonts.white : fonts.blue600,
	];

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[defaultButtonStyle, buttonStyle]}
			disabled={disabled || loading}
		>
			{loading ? (
				<ActivityIndicator size="small" color={tailwindColors.gray600} />
			) : (
				<Text style={[defaultTextStyle, textStyle]}>{title}</Text>
			)}
		</TouchableOpacity>
	);
}

Button.defaultProps = {
	disabled: false,
	variant: 'primary',
	buttonStyle: {},
	textStyle: {},
	loading: false,
};
