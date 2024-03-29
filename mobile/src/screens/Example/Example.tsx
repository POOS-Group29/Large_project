import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { 
	View, 
	StyleSheet,
	Text,
	useColorScheme,
	Platform, 
	PermissionsAndroid, 
} from 'react-native';

function Example() {
	const [currentPosition, setCurrentPosition] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	  });
	
	//   const [restaurants, setRestaurants] = useState([]);
	//   const [region, setRegion] = useState({
	// 	latitude: 37.7749, // Initial region set to San Francisco
	// 	longitude: -122.4194,
	// 	latitudeDelta: 0.0922,
	// 	longitudeDelta: 0.0421,
	//   });
	
	  const requestLocationPermission = async () => {
		if (Platform.OS === 'ios') {
		  Geolocation.requestAuthorization(
			() => {
			  console.log("Success");
			},
			() => {
			  console.log("Failed");
			}
		  );
		  locateCurrentPosition();
		} else {
		  const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
			  title: 'Location Access Required',
			  message: 'This app needs to access your location',
			  buttonPositive:''
			},
		  );
	
		  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			locateCurrentPosition();
		  } else {
			// Handle permission denied
		  }
		}
	  };
	

	const locateCurrentPosition = () => {
		Geolocation.getCurrentPosition(
			(position: { coords: { latitude: any; longitude: any; }; }) => {
				const { latitude, longitude } = position.coords;
				setCurrentPosition({
					...currentPosition,
					latitude,
					longitude,
				});
			},
			(error: any) => console.log(error),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
		);
	};
	useEffect(() => {
		requestLocationPermission();
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<MapView
				// provider={PROVIDER_GOOGLE}
				style={{ width: '100%', height: '100%' }}
				region={currentPosition}
				mapType="satelliteFlyover"
				showsUserLocation
				zoomEnabled
			>
				{/* <Marker
					coordinate={currentPosition}        
					title={"You are here"}
				/> */}
			</MapView>
		</View>
	);
}

export default Example;