/* eslint-disable no-underscore-dangle */
import { Rating } from '@kolking/react-native-rating';
import { useNavigation } from '@react-navigation/native';
import { LocationSchemaType } from '@xhoantran/common';
import { useState } from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useTheme } from '@/theme';
import { useSearchLocation } from '../api/search';

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
		marginTop: 10,
		width: '100%', // Use full width of the screen
		display: 'flex',
		flexDirection: 'column',
	},
	slideView: {
		backgroundColor: '#ffffff', // White background for each item
		borderWidth: 1,
		borderColor: '#e0e0e0', // Lighter border color
		borderRadius: 20, // Rounded corners
		padding: 16, // Padding inside each item
		marginBottom: 10, // Space between items
		shadowOpacity: 0.1,
	},
	slideItem: {
		paddingBottom: 5,
	},
	text: {
		fontSize: 17,
		color: '#333',
		fontWeight: 'bold',
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subText: {
		fontSize: 14,
		color: '#666', // Slightly lighter color for less important text
		marginTop: 4, // Space between main text and subtext
	},
	imageContainer: {
		borderRadius: 4,
		width: '100%',
		height: 150,
	},
	searchContainer: {
		padding: 10,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 20,
	},
	input: {
		fontSize: 16,
	},
});

interface ListLocationProps {
	locations: LocationSchemaType[];
}

export function ListLocation(props: ListLocationProps) {
	const { layout, gutters, fonts } = useTheme();
	const { locations } = props;
	const [searchQuery, setSearchQuery] = useState('');
	const navigation = useNavigation();
	const searchLocation = useSearchLocation({
		name: searchQuery,
		config: {
			enabled: searchQuery.length > 0,
		},
	});

	const listLocation = searchQuery.length > 0 ? searchLocation.data : locations;

	const calculateRating = (sum: number, count: number): number => {
		return count === 0 ? 0 : sum / count;
	};

	return (
		<View style={[styles.container]}>
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.input}
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search..."
					clearButtonMode="while-editing"
				/>
			</View>
			<ScrollView style={styles.scrollView}>
				{listLocation?.map((location, index) => (
					<View style={styles.slideView} key={index}>
						<Pressable
							style={styles.slideItem}
							onPress={() =>
								// @ts-expect-error navigation type
								navigation.navigate('RetrieveLocation', {
									locationId: location._id,
								})
							}
						>
							<View style={[layout.flex_1, layout.col]}>
								<View style={styles.imageContainer}>
									{location.image ? (
										<Image
											style={styles.imageContainer}
											alt={location.name}
											source={{
												uri: location.image,
											}}
										/>
									) : (
										<Image
											style={styles.imageContainer}
											alt="No image available"
											source={{
												uri: 'https://via.placeholder.com/150',
											}}
										/>
									)}
								</View>

								<Text style={[styles.text, gutters.marginTop_8]}>
									{location.name}
								</Text>

								{/* Types */}
								<View style={gutters.marginTop_4}>
									<Text style={[fonts.size_12, fonts.medium, fonts.gray600]}>
										Types:{' '}
										{location.types.length === 0
											? 'N/A'
											: location.types.join(', ')}
									</Text>
								</View>

								{/* Maximum Depth */}
								<View style={gutters.marginTop_4}>
									<Text style={[fonts.size_12, fonts.medium, fonts.gray600]}>
										Maximum Depth:{' '}
										{location.maximumDepth
											? `${location.maximumDepth.metters.toPrecision(
													4,
											  )}m / ${location.maximumDepth.feet.toPrecision(4)}ft`
											: 'N/A'}
									</Text>
								</View>

								<View style={[styles.rating, gutters.marginTop_8]}>
									<Rating
										size={17}
										rating={calculateRating(
											location.difficultyRateValue,
											location.difficultyRateCount,
										)}
										disabled
									/>
									<Text
										style={[
											gutters.marginLeft_8,
											fonts.size_12,
											fonts.medium,
											fonts.gray500,
										]}
									>
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
