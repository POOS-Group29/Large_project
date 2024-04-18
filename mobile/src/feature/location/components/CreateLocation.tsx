import { Button } from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

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
