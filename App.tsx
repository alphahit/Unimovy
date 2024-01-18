import React from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './src/navigation/DrawerNavigator';
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
