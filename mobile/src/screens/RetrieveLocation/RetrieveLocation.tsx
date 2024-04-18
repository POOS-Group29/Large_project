import LocationDetails from '@/feature/location/components/LocationDetails';
import RateLocation from '@/feature/location/components/RateLocation';
import { useTheme } from '@/theme';
import { ApplicationStackParamList } from '@/types/navigation';
import type { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { useRetrieveLocation } from '../../feature/location/api/retrieve';

type Prpops = StackScreenProps<ApplicationStackParamList, 'RetrieveLocation'>;

function RetrieveLocation({ route }: Prpops) {
	const { locationId } = route.params;
	const { layout } = useTheme();
	const retriveLocation = useRetrieveLocation({ locationId });

	if (retriveLocation.isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View
			style={[
				layout.fullHeight,
				layout.col,
				layout.itemsCenter,
				layout.justifyStart,
			]}
		>
			{retriveLocation.data ? (
				<>
					<LocationDetails location={retriveLocation.data} />
					<RateLocation
						location={retriveLocation.data}
						refetch={() => {
							void retriveLocation.refetch();
						}}
					/>
				</>
			) : (
				<Text>Location not found</Text>
			)}
		</View>
	);
}
export default RetrieveLocation;
