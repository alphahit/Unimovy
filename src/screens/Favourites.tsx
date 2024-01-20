/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

// import { Container } from './styles';

const Favourites: React.FC = () => {
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
      {/* <View
        style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          height: 50,
          bottom: 0,
          opacity:0
        }}>
        <View
          style={{
            borderRadius: 5000,
            height: 50,
            width: 50,
            backgroundColor: 'yellow',
            marginLeft: '32.5%',
            borderWidth: 10,
            borderColor: 'rgba(158, 150, 150, .5)',
            position: 'absolute',
            bottom: 25,
          }}
        />
    
      </View> */}
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 42,
//     lineHeight: 84,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     backgroundColor: '#000000c0',
//   },
// });
export default Favourites;
