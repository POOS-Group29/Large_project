import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen, Main, SignIn, SignUp, Startup } from '@/screens';
import { useTheme } from '@/theme';

import DrawerContent from '@/components/Drawer/DrawerContent';
import CreateLocation from '@/screens/CreateLocation/CreateLocation';
import RetrieveLocation from '@/screens/RetrieveLocation/RetrieveLocation';
import { useAuthStorage } from '@/store/auth';
import type { ApplicationStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<ApplicationStackParamList>();
const Drawer = createDrawerNavigator();

function AppStack() {
	const { variant } = useTheme();

	return (
		<Stack.Navigator key={variant}>
			<Stack.Screen
				name="Main"
				component={Main}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="CreateLocation"
				component={CreateLocation}
				options={{
					headerShown: true,
					title: 'Create Location',
					headerBackTitle: 'Back',
				}}
			/>
			<Stack.Screen
				name="RetrieveLocation"
				component={RetrieveLocation}
				options={{
					headerShown: true,
					title: 'Retrieve Location',
					headerBackTitle: 'Back',
				}}
			/>
		</Stack.Navigator>
	);
}

function DrawerStack() {
	return (
		<Drawer.Navigator
			drawerContent={DrawerContent}
			screenOptions={{ drawerPosition: 'left' }}
		>
			<Drawer.Screen
				name="Home"
				component={AppStack}
				options={{
					headerShown: false,
					headerTitle: '',
					headerTransparent: true,
				}}
			/>
		</Drawer.Navigator>
	);
}

function AuthStack() {
	const { variant } = useTheme();

	return (
		<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AuthScreen" component={AuthScreen} />
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	);
}

function ApplicationNavigator() {
	const { navigationTheme } = useTheme();
	const { isAuthorized } = useAuthStorage();

	return (
		<NavigationContainer theme={navigationTheme}>
			{isAuthorized ? <DrawerStack /> : <AuthStack />}
			<Stack.Screen name="Startup" component={Startup} />
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
