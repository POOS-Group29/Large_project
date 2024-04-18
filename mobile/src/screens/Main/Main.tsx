/* eslint-disable no-console */
import BottomSheet from '@gorhom/bottom-sheet';
import Geolocation, {
	GeolocationError,
	GeolocationResponse,
} from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, PermissionsAndroid, Platform, View } from 'react-native';
import type { Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { useDebounceCallback } from 'usehooks-ts';

import { useListLocation } from '@/feature/location/api/list';
import { CreateLocation } from '@/feature/location/components/CreateLocation';
import { ListLocation } from '@/feature/location/components/ListLocation';
import { useTheme } from '@/theme';

export default function Main() {
	const { layout } = useTheme();

	const mapViewRef = useRef<MapView>(null);

	const [keyboardHeight, setKeyboardHeight] = useState(0);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
			setKeyboardHeight(e.endCoordinates.height);
			// bottomSheetRef.current?.snapToIndex(0);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardHeight(0);
			// bottomSheetRef.current?.snapToIndex(1);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	const snapPoints = useMemo(
		() => (keyboardHeight > 0 ? ['90%'] : ['25%', '90%']),
		[keyboardHeight],
	);

	const [currentRegion, setCurrentRegion] = useState<Region>({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [currentPosition, setCurrentPosition] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 2,
		longitudeDelta: 2,
	});

	const locateCurrentPosition = () => {
		Geolocation.getCurrentPosition(
			(position: GeolocationResponse) => {
				const { latitude, longitude } = position.coords;
				setCurrentPosition({
					...currentPosition,
					latitude,
					longitude,
				});
				mapViewRef.current?.animateToRegion({
					latitude,
					longitude,
					latitudeDelta: 2,
					longitudeDelta: 2,
				});
			},
			(error: GeolocationError) => console.log(error),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
		);
	};

	const requestLocationPermission = async () => {
		if (Platform.OS === 'ios') {
			Geolocation.requestAuthorization(
				() => {
					locateCurrentPosition();
				},
				() => {
					console.log('Failed');
				},
			);
		} else {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Location Access Required',
					message: 'This app needs to access your location',
					buttonPositive: '',
				},
			);

			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				locateCurrentPosition();
			} else {
				// Handle permission denied
			}
		}
	};

	useEffect(() => {
		void requestLocationPermission();
	}, []);

	const debouncedSetCurrentRegion = useDebounceCallback(setCurrentRegion, 300);
	const isFocus = useIsFocused();
	const listLocation = useListLocation({
		lat: currentRegion.latitude,
		long: currentRegion.longitude,
	});

	useEffect(() => {
		void listLocation.refetch();
	}, [currentRegion, isFocus]);

	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<View>
			<MapView
				ref={mapViewRef}
				style={[layout.fullHeight, layout.fullWidth]}
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

			<BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
				<ListLocation locations={listLocation.data ?? []} />
			</BottomSheet>

			<CreateLocation />
		</View>
	);
}
