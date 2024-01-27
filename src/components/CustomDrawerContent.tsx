import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const CustomDrawerContent = props => {
  const {state, navigation, descriptors} = props;

  return (
    <View style={styles.drawerContent}>
      <Image
        style={styles.image}
        source={require('../assets/ur.png')}
        resizeMode="contain" // or 'cover', depending on your needs
      />
      {state.routes.map((route, index) => {
        // Get the custom label from the descriptors
        const {drawerLabel} = descriptors[route.key].options;
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.drawerItem}>
            <Text style={styles.drawerItemText}>
              {drawerLabel || route.name}
            </Text>
            <View style={{height: 1, width: '80%', backgroundColor: 'red'}} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    color: 'white',
    backgroundColor: 'black',
    borderColor: '#2D0E08',
    borderWidth: 10,
    width: '100%',
    // Additional styling if needed
  },
  drawerItem: {
    paddingBottom: 15,
    paddingHorizontal: 15,
    // Style for each drawer item
  },
  drawerItemText: {
    fontSize: 16,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 100,
  },
});
