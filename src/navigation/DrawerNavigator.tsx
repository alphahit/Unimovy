import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Favourites from '../screens/Favourites';
import StackNavigator from './StackNavigator';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Test from '../screens/Test';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{drawerLabel: 'My Home'}} // Set an alternate title for the drawer item
      />
      <Drawer.Screen name="Favourites" component={Favourites} />
      {/* <Drawer.Screen name="Test" component={Test} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
