import { Button } from '@/components/Button';
import { useTheme } from '@/theme';
import AuthBackgroundImage from '@/theme/assets/images/auth_bg.png';
import { isImageSourcePropType } from '@/types/guards/image';
import { ApplicationScreenProps } from '@/types/navigation';
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';

function AuthScreen({ navigation }: ApplicationScreenProps) {
	const { layout, gutters, fonts, components } = useTheme();

	if (!isImageSourcePropType(AuthBackgroundImage)) {
		throw new Error('Image source is not valid');
	}

	return (
		<>
			<ImageBackground
				source={AuthBackgroundImage}
				resizeMode="cover"
				style={components.bgImage}
			/>
			<SafeAreaView style={[layout.flex_1]}>
				<View style={[layout.flex_1, layout.itemsCenter, gutters.marginTop_40]}>
					<Text style={[fonts.size_32, fonts.white, fonts.bold]}>
						Scuparadise
					</Text>
				</View>
				<View
					style={[
						layout.flex_1,
						layout.col,
						layout.justifyEnd,
						gutters.marginHorizontal_32,
						gutters.marginBottom_12,
					]}
				>
					{/* Title */}
					<Text style={[fonts.size_24, fonts.bold, fonts.white]}>
						Welcome to Scuparadise
					</Text>

					{/* Subtitle */}
					<Text
						style={[
							fonts.size_16,
							fonts.medium,
							fonts.white,
							gutters.marginTop_12,
						]}
					>
						Connect with Scuba Enthusiasts Worldwide and Explore the Ocean
					</Text>

					{/* Button */}
					<View style={[gutters.marginVertical_24]}>
						<Button
							title="Begin Your Adventure"
							onPress={() => navigation.push('SignIn')}
							variant="primary"
						/>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
}

export default AuthScreen;
