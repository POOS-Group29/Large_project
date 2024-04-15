import { useTheme } from '@/theme';
import type { LocationSchemaType } from '@/types';
import { useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { CreateLocation } from './CreateLocation';

interface ListLocationProps {
	locations: LocationSchemaType[];
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		top: '50%',
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
	},
	slideBar: {
		width: 40,
		height: 5,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		borderRadius: 5,
		alignSelf: 'center',
	},
});

export function ListLocation(props: ListLocationProps) {
	const { borders, gutters } = useTheme();
	const { locations } = props;

	const [selectedLocation, setSelectedLocation] =
		useState<LocationSchemaType | null>(null);

	return (
		<View style={[styles.container]}>
			{/* Slide bar */}
			<View style={styles.slideBar} />

			<CreateLocation />

			{selectedLocation ? (
				<View>
					<TouchableOpacity onPress={() => setSelectedLocation(null)}>
						<Text>Back</Text>
					</TouchableOpacity>

					<View style={[gutters.marginVertical_16, borders.gray900]}>
						<Text>{selectedLocation.name}</Text>
						<Text>{selectedLocation.address}</Text>
					</View>
				</View>
			) : (
				locations.map((location, locationId) => (
					<View
						style={[gutters.marginVertical_16, borders.gray900]}
						key={locationId}
					>
						<Pressable onPress={() => setSelectedLocation(location)}>
							<View>
								<Text>{location.name}</Text>
								<Text>{location.address}</Text>
							</View>
						</Pressable>
					</View>
				))
			)}
		</View>
	);
}
