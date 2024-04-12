import { Button } from '@/components/Button';
import { View } from 'react-native';
import { useCreateLocation } from '../api/create';

export function CreateLocation() {
	const createLocation = useCreateLocation();

	return (
		<View>
			<Button
				buttonStyle={[]}
				title="Create Location"
				onPress={() => console.log('Create Location')}
			/>
		</View>
	);
}
