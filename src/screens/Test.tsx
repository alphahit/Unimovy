/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';

const Test: React.FC = () => {
  return (
    <View style={{backgroundColor: 'pink', flex: 1}}>
      <Text>Favourites</Text>
      <ImageBackground
        source={require('../assets/bar.png')}
        resizeMode="cover"
        style={{position: 'absolute', width: '100%', height: 60, bottom: 0}}>
        <ImageBackground
          source={require('../assets/check.png')}
          resizeMode="cover"
          style={{
            position: 'absolute',
            width: 90,
            height: 90,
            bottom: 10,
            left: '38%',
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Sabya Choda');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Text>Banda Sabya</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default Test;
