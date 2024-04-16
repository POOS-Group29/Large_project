import { useListLocation } from '@/feature/location/api/list';
import React, { useEffect, useState, useCallback, useMemo, useRef} from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import type { Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { useDebounceCallback } from 'usehooks-ts';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';


import { CreateLocation } from '@/feature/location/components/CreateLocation';
import { ListLocation } from '@/feature/location/components/ListLocation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuthStorage } from '@/store/auth';
// import { useLocationStorage } from '@/store/location';

export default function Main() {
  // const { selectedLocation} = useLocationStorage();

	const [currentRegion, setCurrentRegion] = useState<Region>({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
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

	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);
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
				onChange={handleSheetChanges}
				snapPoints={snapPoints}
			>
				<ListLocation locations={listLocation.data ?? []} />

			</BottomSheet> 
			<Pressable style={styles.logoutButton}
				onPress={logout}
			>
				<Text style={styles.logoutButtonText}>Logout</Text>
			</Pressable>
		</View>
	);
}
