import { Button } from '@/components/Button';
import { useRateLocation } from '@/feature/location/api/rate';
import { useUpdateRating } from '@/feature/location/api/update';
import { useTheme } from '@/theme';
import { Rating } from '@kolking/react-native-rating';
import { LocationSchemaType } from '@xhoantran/common';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	clickToRateText: {
		marginBottom: 10,
		fontSize: 16,
		color: '#555',
		marginTop: 5,
		fontStyle: 'italic',
	},
});

interface RateLocationProps {
	location: LocationSchemaType;
	refetch: () => void;
}

function RateLocation({ location, refetch }: RateLocationProps) {
	const { layout, gutters } = useTheme();

	const rateLocation = useRateLocation();
	const updateLocation = useUpdateRating();
	const [rating, setRating] = useState(
		location.userRating ? location.userRating.value : 0,
	);

	const submitRating = () => {
		if (location?.userRating === null) {
			rateLocation.mutate(
				{
					// eslint-disable-next-line no-underscore-dangle
					locationId: location._id,
					value: rating,
				},
				{
					onSuccess: () => refetch(),
				},
			);
		} else {
			updateLocation.mutate(
				{
					// eslint-disable-next-line no-underscore-dangle
					locationId: location._id,
					value: rating,
				},
				{
					onSuccess: () => refetch(),
				},
			);
		}
	};

	return (
		<View style={[layout.col, layout.itemsCenter]}>
			<Text style={[styles.clickToRateText]}>Click to rate</Text>
			<Rating size={34} rating={rating} onChange={setRating} />
			<Button
				buttonStyle={[gutters.marginTop_16, gutters.paddingHorizontal_32]}
				title="Submit"
				onPress={() => submitRating()}
			/>
		</View>
	);
}

export default RateLocation;
