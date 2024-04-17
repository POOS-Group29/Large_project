import * as React from 'react';
import { Button, Text } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import {useAuthStorage} from '@/store/auth'

export default function DrawerProfile({ isOpened }: {isOpened: boolean}) {
  const [open, setOpen] = React.useState(true);
    const {user} = useAuthStorage();
  return (
    <Drawer
      style={{
        width: '100%',
        height: '100%'
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
    >
      <Button
        onPress={() => setOpen((prevOpen) => !prevOpen)}
        title={`${open ? 'Close' : 'Open'} drawer`}
      />
    </Drawer>
  );
}