import { Button } from '@/components/Button';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function CreateLocation() {
	const navigation = useNavigation();
	return (
		<View style = {{marginTop: 10}}>
			<Button
				buttonStyle={[]}
				title="Create Location"
				onPress={() => navigation.navigate('CreateLocation') }
			/>
		</View>
	);
}
