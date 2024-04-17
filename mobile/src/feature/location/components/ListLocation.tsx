import { useTheme } from '@/theme';
import type { LocationSchemaType } from '@/types';
import { useEffect, useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	TextInput
} from 'react-native';
import { CreateLocation } from './CreateLocation';
import { ScrollView } from 'react-native-gesture-handler';
import { generateBorderColors, staticBorderStyles } from '@/theme/borders';
import { Rating } from '@kolking/react-native-rating';
import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { useSearchLocation } from '../api/search';
import { set } from 'zod';
import { use } from 'i18next';

interface ListLocationProps {
	locations: LocationSchemaType[];
}
var firstLoad = true;
export function ListLocation(props: ListLocationProps) {
	const { borders, gutters } = useTheme();
	const { locations } = props;
	const [searchQuery, setSearchQuery] = useState('');
	const [listLocation, setListLocation] = useState<LocationSchemaType[]>(locations);
	const { data, error, isLoading, refetch } = useSearchLocation({name: searchQuery});

	useEffect(() => {
		if (!isLoading && data){
			setListLocation(data);
			firstLoad = false;
		}
	}, [isLoading, data]);

	useEffect(() => {
		refetch();
	}, [searchQuery]);

	console.log(listLocation)

	const [selectedLocation, setSelectedLocation] =
		useState<LocationSchemaType | null>(null);
	
	const calculateRating = (sum:number, count:number) :number=>{
		return count === 0 ? 0 : sum/count;
	
	}
	const navigation = useNavigation();
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
				{ listLocation && listLocation.map((location, index) => (
					<View
						style={styles.slideView}
						key={index}
					>
						<Pressable style={styles.slideItem} onPress={() => navigation.navigate('RetrieveLocation', {locationId: location._id})}>
							<View>
								<View style={styles.imageContainer}>
									<Image
										style={{width: '100%', height: 150}}
										alt={location.name}
										source={{
										uri: location.image,
										}}
									/>
								</View>
								
								<Text style={styles.text}>{location.name}</Text>

								<View style={styles.rating}>
									<Rating size={17} rating={calculateRating(location.difficultyRateValue, location.difficultyRateCount)} disabled />
									<Text style={{marginLeft:5}}>{location.difficultyRateCount}</Text>
								</View>
							</View>
						</Pressable>
					</View>
				))}
			</ScrollView>
			{/* <CreateLocation/> */}
		</View>
	);
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
		marginBottom: 2,  // Space between items
		shadowOpacity: 0.1,
	  },
	slideItem: {
		paddingBottom: 5,
	},
	text: {
		fontSize: 17,
		color: '#333',
		fontWeight: 'bold',
		top: 10, 
		bottom: 10,
	  },
	  rating: {
		flexDirection: 'row',
		top: 12,
	  },
	  subText: {
		fontSize: 14,
		color: '#666',  // Slightly lighter color for less important text
		marginTop: 4,  // Space between main text and subtext
	  },
	  imageContainer: {
		
	  },
	  searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
    },
    input: {
        fontSize: 16
    }
	
});