import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { API } from '@/lib/common';
import useTheme from '@/theme/hooks/useTheme';
import { ApplicationScreenProps } from '@/types/navigation';
import {
	SignUpRequestSchema,
	SignUpRequestSchemaType,
} from '@/types/schemas/auth';
import { errorSchema } from '@/types/schemas/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, SafeAreaView, Text, View } from 'react-native';

const passwordRequirements = [
	{
		text: 'Password must be at least 8 characters long',
		validate: (password: string) => password.length >= 8,
	},
	{
		text: 'Password must contain at least one uppercase letter',
		validate: (password: string) => /[A-Z]/.test(password),
	},
	{
		text: 'Password must contain at least one number',
		validate: (password: string) => /[0-9]/.test(password),
	},
	{
		text: 'Password must contain at least one special character',
		validate: (password: string) => /[!@#$%^&*]/.test(password),
	},
];

function SignUp({ navigation }: ApplicationScreenProps) {
	const { layout, fonts, gutters, variant } = useTheme();

	const {
		control,
		handleSubmit,
		watch,
		formState: { isValid, isSubmitting },
	} = useForm<SignUpRequestSchemaType>({
		resolver: zodResolver(SignUpRequestSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		mode: 'onBlur',
	});

	const password = watch('password');

	const onSubmit: SubmitHandler<SignUpRequestSchemaType> = async data => {
		try {
			await API.auth.signUp(data);
			Alert.alert(
				'Success',
				'Account created successfully, please verify your email to continue.',
				[{ text: 'OK', onPress: () => navigation.replace('SignIn') }],
			);
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
					Sign up
				</Text>

				<Controller
					control={control}
					name="name"
					render={({
						field: { onChange, value, onBlur },
						fieldState: { error },
					}) => (
						<Input
							label="Full Name"
							placeholder="Enter your full name"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={error?.message}
							required
						/>
					)}
				/>

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
							containerStyle={gutters.marginTop_16}
							error={error?.message}
							required
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
							error={error?.message}
							secureTextEntry
							containerStyle={gutters.marginTop_16}
							required
						/>
					)}
				/>

				<View>
					{passwordRequirements.map((requirement, index) => (
						<View key={index} style={[gutters.marginTop_8]}>
							<Text
								style={
									requirement.validate(password) ? fonts.green700 : fonts.red500
								}
							>
								{requirement.text}
							</Text>
						</View>
					))}
				</View>

				<Button
					title="Create account"
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onPress={handleSubmit(onSubmit)}
					buttonStyle={gutters.marginTop_32}
					loading={isSubmitting}
					disabled={!isValid}
				/>

				<Text
					style={[
						fonts.size_16,
						gutters.marginTop_32,
						variant === 'default' ? fonts.gray950 : fonts.gray100,
					]}
				>
					Already have an account?
					<Text
						style={[fonts.bold, fonts.blue500]}
						onPress={() => navigation.replace('SignIn')}
					>
						{' '}
						Sign in
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	);
}

export default SignUp;
