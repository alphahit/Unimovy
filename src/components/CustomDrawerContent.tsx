import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomDrawerContent = props => {
  const {state, navigation} = props;

  return (
    <View style={styles.drawerContent}>
      {state.routes.map((route, index) => (
        <TouchableOpacity
          key={route.key}
          onPress={() => navigation.navigate(route.name)}
          style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    //marginTop: 60,
    color: 'white',
    backgroundColor: 'black',
    borderColor: 'brown',
    borderWidth: 10,
    width: '100%',
    // Additional styling if needed
  },
  drawerItem: {
    padding: 15,
    // Style for each drawer item
  },
  drawerItemText: {
    fontSize: 16,
    color: 'white',
    // Text style
  },
});
