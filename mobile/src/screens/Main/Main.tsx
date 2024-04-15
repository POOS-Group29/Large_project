import { useListLocation } from '@/feature/location/api/list';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import type { Region } from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import { useDebounceCallback } from 'usehooks-ts';

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

	useEffect(() => {
		void listLocation.refetch();
	}, [currentRegion]);

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
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
			<ListLocation locations={listLocation.data ?? []} />
		</View>
	);
}
