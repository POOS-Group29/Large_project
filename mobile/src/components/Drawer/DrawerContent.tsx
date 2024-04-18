import { Button } from '@/components/Button';
import { useAuthStorage } from '@/store/auth';
import { useTheme } from '@/theme';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
	userInfoSection: {
		paddingLeft: 20,
	},
	name: {
		marginTop: 10,
		fontSize: 20,
	},
	email: {
		marginTop: 0,
		fontSize: 10,
		opacity: 0.5,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	drawerSection: {
		marginTop: 15,
	},
	logoutBtn: {
		width: '100%',
		marginTop: 20,
		paddingVertical: 10,
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
	},
});

export default function DrawerContent() {
	const { layout, gutters } = useTheme();
	const { user, setIsAuthorized, setToken, setUser } = useAuthStorage();

	return (
		<DrawerContentScrollView>
			<View
				style={[
					layout.fullWidth,
					layout.flex_1,
					layout.col,
					gutters.paddingHorizontal_12,
				]}
			>
				<View style={[layout.flex_1, layout.row, layout.itemsCenter]}>
					<Icon name="user-circle" size={28} />
					<View style={styles.userInfoSection}>
						<Text style={styles.name}>{user?.name}</Text>
						<Text style={styles.email}>{user?.email}</Text>
					</View>
				</View>
				<View style={[styles.logoutBtn]}>
					<Button
						title="Logout"
						onPress={() => {
							setIsAuthorized(false);
							setToken(null);
							setUser(null);
						}}
					/>
				</View>
			</View>
		</DrawerContentScrollView>
	);
}
