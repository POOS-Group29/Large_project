import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen, Main, SignIn, SignUp, Startup } from '@/screens';
import { useTheme } from '@/theme';

import { useAuthStorage } from '@/store/auth';
import type { ApplicationStackParamList } from '@/types/navigation';
import CreateLocation from '@/screens/CreateLocation/CreateLocation';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();
	const { isAuthorized } = useAuthStorage();

	return (
		<NavigationContainer theme={navigationTheme}>
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				{isAuthorized ? (
					<>
						<Stack.Screen name="Main" component={Main} />
						<Stack.Screen name="CreateLocation" component={CreateLocation} options={{headerShown : true, title : "Create Location"}}/>
					</>
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
