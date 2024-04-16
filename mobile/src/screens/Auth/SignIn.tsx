import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { API } from '@/lib/common';
import { useAuthStorage } from '@/store/auth';
import useTheme from '@/theme/hooks/useTheme';
import { ApplicationScreenProps } from '@/types/navigation';
import type { SignInRequestSchemaType } from '@/types/schemas/auth';
import { SignInRequestSchema } from '@/types/schemas/auth';
import { errorSchema } from '@/types/schemas/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, SafeAreaView, Text, View } from 'react-native';

function SignIn({ navigation }: ApplicationScreenProps) {
	const { layout, fonts, gutters, variant } = useTheme();
	const { setUser, setIsAuthorized, setToken } = useAuthStorage();

	const {
		control,
		handleSubmit,
		formState: { isValid, isSubmitting },
	} = useForm<SignInRequestSchemaType>({
		resolver: zodResolver(SignInRequestSchema),
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<SignInRequestSchemaType> = async data => {
		try {
			const res = await API.auth.signIn(data);
			console.log(res.token);
			console.log(res.user)
			setToken(res.token);
			setUser(res.user);
			setIsAuthorized(true);
		} catch (err) {
			if (err instanceof HTTPError) {
				const message = errorSchema.parse(await err.response?.json());
				Alert.alert('Error', message.message);
			}
		}
	};

	return (
		<SafeAreaView style={[layout.flex_1]}>
			<View
				style={[
					layout.flex_1,
					layout.itemsCenter,
					layout.justifyCenter,
					gutters.marginHorizontal_24,
				]}
			>
				<Text
					style={[
						fonts.size_24,
						fonts.bold,
						gutters.marginBottom_32,
						variant === 'default' ? fonts.gray950 : fonts.gray100,
					]}
				>
					Sign in
				</Text>

				<Controller
					control={control}
					name="email"
					render={({
						field: { onChange, value, onBlur },
						fieldState: { error },
					}) => (
						<Input
							label="Email"
							placeholder="Enter your email"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							required
							error={error?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					render={({
						field: { onChange, value, onBlur },
						fieldState: { error },
					}) => (
						<Input
							label="Password"
							placeholder="Enter your password"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							secureTextEntry
							containerStyle={gutters.marginTop_16}
							required
							error={error?.message}
						/>
					)}
				/>

				<Button
					title="Sign in"
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onPress={handleSubmit(onSubmit)}
					disabled={!isValid}
					buttonStyle={gutters.marginTop_32}
					loading={isSubmitting}
				/>

				<Text
					style={[
						fonts.size_16,
						gutters.marginTop_32,
						variant === 'default' ? fonts.gray950 : fonts.gray100,
					]}
				>
					Don&apos;t have an account?
					<Text
						style={[fonts.bold, fonts.blue500]}
						onPress={() => navigation.replace('SignUp')}
					>
						{' '}
						Sign up
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
}

export default SignIn;
