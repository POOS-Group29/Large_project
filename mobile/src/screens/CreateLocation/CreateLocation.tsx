import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useCreateLocation } from '../../feature/location/api/create';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	label: {
		alignSelf: 'flex-start',
		marginLeft: 10,
		marginVertical: 5,
		fontSize: 16,
		fontWeight: 'bold',
	},
	input: {
		width: '100%',
		height: 40,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		padding: 10,
		marginVertical: 5,
	},
});

function CreateLocation() {
	const navigation = useNavigation();

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	const validateInputs = () => {
		if (!name.trim()) {
			Alert.alert('Validation Error', 'Please enter your name.');
			return false;
		}

		if (!/^\d{5}$/.test(zip)) {
			Alert.alert('Validation Error', 'Please enter a valid 5-digit zip code.');
			return false;
		}

		const lat = parseFloat(latitude);
		if (lat < -90 || lat > 90) {
			Alert.alert(
				'Validation Error',
				'Please enter a valid latitude (-90 to 90).',
			);
			return false;
		}

		const long = parseFloat(longitude);
		if (long < -180 || long > 180) {
			Alert.alert(
				'Validation Error',
				'Please enter a valid longitude (-180 to 180).',
			);
			return false;
		}

		return true;
	};

	const createLocation = useCreateLocation();

	const handleSubmit = () => {
		if (validateInputs()) {
			const createData = {
				name,
				address,
				city,
				state,
				zip,
				lat: parseFloat(latitude),
				long: parseFloat(longitude),
			};

			createLocation.mutate(createData, {
				onSuccess: () => {
					Alert.alert('Location created successfully!');
					navigation.navigate('Main');
				},
				onError: error => {
					console.log(error);
					Alert.alert('Error Creating Location');
				},
			});
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
		>
			<View style={styles.container}>
				<ScrollView>
					{/* Name Input */}
					<Text style={styles.label}>Name</Text>
					<TextInput
						style={styles.input}
						value={name}
						placeholder="Name"
						onChangeText={setName}
					/>

					{/* Address Input */}
					<Text style={styles.label}>Address</Text>
					<TextInput
						style={styles.input}
						value={address}
						placeholder="Address"
						onChangeText={setAddress}
					/>

					{/* City Input */}
					<Text style={styles.label}>City</Text>
					<TextInput
						style={styles.input}
						value={city}
						placeholder="City"
						onChangeText={setCity}
					/>

					{/* State Input */}
					<Text style={styles.label}>State</Text>
					<TextInput
						style={styles.input}
						value={state}
						placeholder="State"
						onChangeText={setState}
					/>

					{/* Zip Code Input */}
					<Text style={styles.label}>Zip Code</Text>
					<TextInput
						style={styles.input}
						value={zip}
						placeholder="Zip Code"
						onChangeText={setZip}
						keyboardType="numeric"
					/>

					{/* Latitude Input */}
					<Text style={styles.label}>Latitude</Text>
					<TextInput
						style={styles.input}
						value={latitude}
						placeholder="Latitude"
						onChangeText={setLatitude}
						keyboardType="numeric"
					/>

					{/* Longitude Input */}
					<Text style={styles.label}>Longitude</Text>
					<TextInput
						style={styles.input}
						value={longitude}
						placeholder="Longitude"
						onChangeText={setLongitude}
						keyboardType="numeric"
					/>

					{/* Submit Button */}
					<Button title="Submit" onPress={handleSubmit} />
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}

export default CreateLocation;
