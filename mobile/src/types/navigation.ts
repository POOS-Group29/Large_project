import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Main: undefined;
	AuthScreen: undefined;
	SignIn: undefined;
	SignUp: undefined;
	CreateLocation: undefined;
	RetrieveLocation: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
