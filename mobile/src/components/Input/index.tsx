/* eslint-disable react/require-default-props */
import { tailwindColors } from '@/theme/_config';
import useTheme from '@/theme/hooks/useTheme';
import { useState } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	TextInput,
	View,
	ViewStyle,
} from 'react-native';

interface InputProps {
	label: string;
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	secureTextEntry?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	required?: boolean;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
	error?: string;
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		fontWeight: '500',
	},
	inputContainer: {
		marginTop: 8,
	},
	input: {
		width: '100%',
		borderRadius: 8,
		borderWidth: 2,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
	},
	inputFocused: {
		borderColor: tailwindColors.blue600,
	},
});

export function Input(props: InputProps) {
	const { layout, fonts, gutters, borders, variant } = useTheme();
	const [isFocused, setIsFocused] = useState(false);
	const {
		label,
		placeholder,
		value,
		onChangeText,
		secureTextEntry = false,
		containerStyle = {},
		required = false,
		autoCapitalize = 'none',
		error = '',
		onBlur = () => {},
	} = props;

	return (
		<View style={[layout.fullWidth, containerStyle]}>
			<Text
				style={[
					styles.label,
					variant === 'default' ? fonts.gray950 : fonts.gray100,
				]}
			>
				{label}
				{required && <Text style={[fonts.red500]}>*</Text>}
			</Text>
			<View style={[styles.inputContainer]}>
				<TextInput
					style={[
						styles.input,
						variant === 'default'
							? [fonts.gray950, borders.gray300]
							: [fonts.gray100, borders.gray700],
						isFocused && styles.inputFocused,
					]}
					placeholder={placeholder}
					placeholderTextColor={
						variant === 'default'
							? tailwindColors.gray500
							: tailwindColors.gray400
					}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={secureTextEntry}
					autoCapitalize={autoCapitalize}
					onFocus={() => setIsFocused(true)}
					onBlur={() => {
						setIsFocused(false);
						onBlur();
					}}
				/>
				<Text style={[gutters.marginTop_4, fonts.red500, fonts.size_12]}>
					{error}
				</Text>
			</View>
		</View>
	);
}
