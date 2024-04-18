import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Main: undefined;
	AuthScreen: undefined;
	SignIn: undefined;
	SignUp: undefined;
	CreateLocation: undefined;
	RetrieveLocation: {
		locationId: string;
	};
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
