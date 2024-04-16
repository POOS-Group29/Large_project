import { Button } from '@/components/Button';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
	createButton: {
		width: '15%',
		position: 'absolute',
        bottom: 20,
        right: 20,
	},
})

export function CreateLocation() {
	const navigation = useNavigation();
	return (
		<View style = {styles.createButton}>
			<Button
				buttonStyle={[]}
				title="Add"
				onPress={() => navigation.navigate('CreateLocation') }
			/>
		</View>
	);
}
