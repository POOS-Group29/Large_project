import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Brand } from '@/components/molecules';
import { SafeScreen } from '@/components/template';
import { API } from '@/lib/common';
import { useAuthStorage } from '@/store/auth';
import { useTheme } from '@/theme';
import type { ApplicationScreenProps } from '@/types/navigation';

function Startup({ navigation }: ApplicationScreenProps) {
	const { layout, gutters, fonts } = useTheme();
	const { setIsAuthorized, setUser } = useAuthStorage();

	const { isSuccess, isFetching, isError, data } = useQuery({
		queryKey: ['startup'],
		queryFn: () => API.auth.fetchProfile(),
	});

	useEffect(() => {
		if (isSuccess) {
			setIsAuthorized(true);
			setUser(data);
			navigation.navigate('Main');
		}

		if (isError) {
			setIsAuthorized(false);
			navigation.navigate('AuthScreen');
		}
	}, [isSuccess, isError]);

	return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				<Brand />
				{isFetching && (
					<ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
				)}
				{isError && (
					<Text style={[fonts.size_16, fonts.red500]}>
						There was an error fetching the data
					</Text>
				)}
			</View>
		</SafeScreen>
	);
}

export default Startup;
