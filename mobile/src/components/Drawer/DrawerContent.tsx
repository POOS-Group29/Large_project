import * as React from 'react';
import { Text, View , StyleSheet, Pressable} from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import {useAuthStorage} from '@/store/auth'
import {Button} from '@/components/Button'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    DrawerItem,
    DrawerContentScrollView,
    DrawerContentComponentProps,
  } from '@react-navigation/drawer';

export default function DrawerContent(props:any) {
  const [open, setOpen] = React.useState(false);
    const {user, setIsAuthorized, setToken, setUser} = useAuthStorage();

    const logout = () =>{
        setIsAuthorized(false)
        setToken(null)
        setUser(null)
    }
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={{flexDirection: 'row'}}>
            <Icon name="user-circle" size={28}/>
            <View style={styles.userInfoSection}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
        </View>
      </View>
      <View style={styles.logoutBtn}>
        <Button  title="Logout" onPress={logout} />
      </View>
    
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    name: {
      marginTop: 10,
      fontSize: 20
    },
    email: {
        marginTop:0,
        fontSize: 10,
        opacity: 0.5
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
    logoutBtn:{
        width: '50%',
        height: '100%',
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
  });