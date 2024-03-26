import { View } from 'react-native';

import MapView from 'react-native-maps';

function Example() {
	return (
		<View style={{ flex: 1 }}>
			<MapView
				// provider={PROVIDER_GOOGLE}
				style={{ width: '100%', height: '100%' }}
				mapType="satelliteFlyover"
				showsUserLocation
				zoomEnabled
			/>
		</View>
	);
}

export default Example;
