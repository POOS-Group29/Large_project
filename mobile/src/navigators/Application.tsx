import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Example, Startup, AuthScreen, SignIn, SignUp } from '@/screens';
import { useTheme } from '@/theme';

import type { ApplicationStackParamList } from '@/types/navigation';
import { useAuthStorage } from '@/store/auth';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();
	const { isAuthorized } = useAuthStorage();

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				{isAuthorized ? (
					<Stack.Screen name="Example" component={Example} />
				) : (
					<>
						<Stack.Screen name="AuthScreen" component={AuthScreen} />
						<Stack.Screen name="SignIn" component={SignIn} />
						<Stack.Screen name="SignUp" component={SignUp} />
					</>
				)}
				<Stack.Screen name="Startup" component={Startup} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
