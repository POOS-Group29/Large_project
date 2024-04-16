import { useTheme } from '@/theme';
import type { LocationSchemaType } from '@/types';
import { useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image
} from 'react-native';
import { CreateLocation } from './CreateLocation';
import { ScrollView } from 'react-native-gesture-handler';
import { generateBorderColors, staticBorderStyles } from '@/theme/borders';
import { Rating } from '@kolking/react-native-rating';
import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';



interface ListLocationProps {
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
		width: '100%',  // Use full width of the screen
		backgroundColor: '#ffffff',  // Light background color for the list
	},
	slideView: {
		backgroundColor: '#ffffff',  // White background for each item
		borderWidth: 1,
		borderColor: '#e0e0e0',  // Lighter border color
		borderRadius: 20,  // Rounded corners
		padding: 16,  // Padding inside each item
		marginBottom: 1,  // Space between items
		shadowOpacity: 0.1,
	  },
	  text: {
		fontSize: 17,
		color: '#333',  // Dark color for text for better readability
		fontWeight: 'bold',  // Bold text for emphasis
	  },
	  subText: {
		fontSize: 14,
		color: '#666',  // Slightly lighter color for less important text
		marginTop: 4,  // Space between main text and subtext
	  },
	  imageContainer: {
		
	  }
	
});

export function ListLocation(props: ListLocationProps) {
	const { borders, gutters } = useTheme();
	const { locations } = props;
	const [selectedLocation, setSelectedLocation] =
		useState<LocationSchemaType | null>(null);
	
	const calculateRating = (sum:number, count:number) :number=>{
		return count === 0 ? 0 : sum/count;
	
	}
	const navigation = useNavigation();
	return (
		<View style={[styles.container]}>
			{/* Slide bar */}
			{/* <View style={styles.slideBar} /> */}

			<CreateLocation/>

			<ScrollView style={styles.scrollView}>
				{ locations.map((location, index) => (
					<View
						// style={[gutters.marginVertical_16, borders.gray900, styles.slideView]}
						style={styles.slideView}
						key={index}
					>
						<Pressable onPress={() => navigation.navigate('RetrieveLocation', {locationId: location._id})}>
							<View>
								<View style={styles.imageContainer}>
									<Image
										style={{width: '100%', height: 200}}
										alt={location.name}
										source={{
										uri: location.image,
										}}
									/>
								</View>
								
								<Text style={styles.text}>{location.name}</Text>
								{/* <Text style={styles.subText}>{location.address}</Text> */}
								<View style={{
									flexDirection: 'row',
								}}>
									<Rating size={17} rating={calculateRating(location.difficultyRateValue, location.difficultyRateCount)} disabled />
									<Text style={{marginLeft:5}}>{location.difficultyRateCount}</Text>
								</View>
							</View>
						</Pressable>
					</View>
				))}
			</ScrollView>
			
		</View>
	);
}
