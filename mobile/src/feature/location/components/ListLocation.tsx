import { useTheme } from '@/theme';
import { ApplicationScreenProps } from '@/types/navigation';
import { Rating } from '@kolking/react-native-rating';
import type { LocationSchemaType } from '@xhoantran/common';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CreateLocation } from './CreateLocation';

interface ListLocationProps extends ApplicationScreenProps {
	locations: LocationSchemaType[];
}

const styles = StyleSheet.create({
	container: {
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 12,
	},
	slideBar: {
		width: 40,
		height: 5,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		borderRadius: 5,
		alignSelf: 'center',
	},
	scrollView: {
		top: '5%',
		width: '100%', // Use full width of the screen
		backgroundColor: '#ffffff', // Light background color for the list
	},
	slideView: {
		backgroundColor: '#ffffff', // White background for each item
		borderWidth: 1,
		borderColor: '#e0e0e0', // Lighter border color
		borderRadius: 20, // Rounded corners
		padding: 16, // Padding inside each item
		// shadowColor: '#000',  // Shadow for 3D effect
		// shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		// shadowRadius: 6,
		// elevation: 3,  // Elevation for Android
	},
	text: {
		fontSize: 17,
		color: '#333', // Dark color for text for better readability
		fontWeight: 'bold', // Bold text for emphasis
	},
	subText: {
		fontSize: 14,
		color: '#666', // Slightly lighter color for less important text
		marginTop: 4, // Space between main text and subtext
	},
	image: {
		width: '100%',
		height: 200,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		marginBottom: 8,
	},
	typeContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 5,
		gap: 5,
	},
});

export function ListLocation(props: ListLocationProps) {
	const { locations, navigation } = props;

	const { gutters, borders, backgrounds, fonts, layout } = useTheme();

	const calculateRating = (sum: number, count: number): number => {
		return count === 0 ? 0 : sum / count;
	};

	return (
		<View style={[styles.container]}>
			<CreateLocation />

			<ScrollView style={styles.scrollView}>
				{locations.map((location, index) => (
					<View
						style={[
							gutters.marginVertical_8,
							borders.gray900,
							styles.slideView,
						]}
						key={index}
					>
						<Pressable
							onPress={() =>
								navigation.navigate('RetrieveLocation', {
									locationId: location._id,
								})
							}
						>
							<View>
								{location.image && (
									<Image
										source={{ uri: location.image }}
										style={styles.image}
									/>
								)}

								<Text style={styles.text}>{location.name}</Text>
								{/* Types */}
								<View style={styles.typeContainer}>
									{location.types.map(type => (
										<View
											key={type}
											style={[
												gutters.padding_4,
												borders.gray900,
												borders.w_1,
												backgrounds.gray200,
												borders.rounded_4,
											]}
										>
											<Text
												style={[fonts.gray900, fonts.size_12, fonts.medium]}
											>
												{type}
											</Text>
										</View>
									))}
								</View>

								<View style={[layout.row, layout.itemsCenter]}>
									<Rating
										size={17}
										rating={calculateRating(
											location.difficultyRateValue,
											location.difficultyRateCount,
										)}
										disabled
									/>
									<Text style={[gutters.marginLeft_8]}>
										{location.difficultyRateCount}
									</Text>
								</View>
							</View>
						</Pressable>
					</View>
				))}
			</ScrollView>
		</View>
	);
}
