import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Favourites from '../screens/Favourites';
import StackNavigator from './StackNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="HomeStack" component={StackNavigator} />
      <Drawer.Screen name="Favourites" component={Favourites} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
