import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Main: undefined;
	AuthScreen: undefined;
	SignIn: undefined;
	SignUp: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
