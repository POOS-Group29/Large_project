import { useListLocation } from '@/feature/location/api/list';
import React, { useEffect, useState, useCallback, useMemo, useRef} from 'react';
import { View, Text, StyleSheet, Button, Pressable, Keyboard, KeyboardAvoidingView, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import type { Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { useDebounceCallback } from 'usehooks-ts';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { ListLocation } from '@/feature/location/components/ListLocation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuthStorage } from '@/store/auth';
import { CreateLocation } from '@/feature/location/components/CreateLocation';
import DrawerProfile from '@/components/Drawer/DrawerProfile';


// import { useLocationStorage } from '@/store/location';

export default function Main() {

	/////////////////
	const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height);
			// bottomSheetRef.current?.snapToIndex(0);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
			// bottomSheetRef.current?.snapToIndex(1);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

	const snapPoints = useMemo(() => keyboardHeight > 0 ? ['90%'] : ['25%', '90%'], [keyboardHeight]);

	/////////////////
	const [currentRegion, setCurrentRegion] = useState<Region>({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [currentPosition, setCurrentPosition] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	
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

	const debouncedSetCurrentRegion = useDebounceCallback(setCurrentRegion, 300);
	const isFocus = useIsFocused();
	const listLocation = useListLocation({
		lat: currentRegion.latitude,
		long: currentRegion.longitude,
	});
	
	const { setUser, setIsAuthorized, setToken } = useAuthStorage();

	useEffect(() => {
		void listLocation.refetch();
	}, [currentRegion, isFocus]);

	const bottomSheetRef = useRef<BottomSheet>(null);

	// const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

	// const handleSheetChanges = useCallback((index: number) => {
	// 	console.log('handleSheetChanges', index);
	// }, []);
	const logout = ()=>{
		setToken('');
		setUser(null);
		setIsAuthorized(false);
	}
	
	return (
		<View >

			<MapView
				style={{ width: '100%', height: '100%' }}
				onRegionChange={region => debouncedSetCurrentRegion(region)}
				mapType="satelliteFlyover"
				showsUserLocation
				zoomEnabled
			>
				{listLocation.data?.map((location, locationIdex) => (
					<Marker
						key={locationIdex}
						coordinate={{
							longitude: location.location.coordinates[0],
							latitude: location.location.coordinates[1],
						}}
						title={location.name}
					/>
				))}
			</MapView>

               	<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
			>
				<ListLocation locations={listLocation.data ?? []} />
			</BottomSheet> 

			<CreateLocation />
			
		</View>
	);
}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 24,
			justifyContent: 'center',
			backgroundColor: 'grey',
		},
		contentContainer: {
			flex: 1,
			alignItems: 'center',
		},
		logoutButton: {
			paddingVertical: 8,
			paddingHorizontal: 12,
			backgroundColor: 'grey',
			position: 'absolute', 
			top:20, 
			right:0, 
			padding: 10, 
			borderRadius: 20,
		},
		logoutButtonText: {
			color: 'white',
			fontSize: 16,
		},
		
	});