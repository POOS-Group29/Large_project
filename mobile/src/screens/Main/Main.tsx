import { useListLocation } from '@/feature/location/api/list';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { useDebounceCallback } from 'usehooks-ts';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';


import { CreateLocation } from '@/feature/location/components/CreateLocation';
import { ListLocation } from '@/feature/location/components/ListLocation';
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

	const listLocation = useListLocation({
		lat: currentRegion.latitude,
		long: currentRegion.longitude,
	});

	console.log('listLocation', listLocation.data);
	
	useEffect(() => {
		void listLocation.refetch();
	}, [currentRegion]);

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
		
	});

	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

	// callbacks
	// const handlePresentModalPress = useCallback(() => {
	// 	bottomSheetRef.current?.present();
	// }, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);
	
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
		</View>
	);
}
