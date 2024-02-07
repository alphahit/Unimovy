/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
const TrailerScreen = ({route, navigation}) => {
  
  const {trailerUrl} = route.params;


useEffect(() => {
  Orientation.lockToLandscape();

  return () => {
    
    Orientation.lockToPortrait();
  };
}, []);

  // Optional: Force landscape orientation if your app supports orientation changes

  return (
    <View style={styles.container}>
      <Video
        source={{uri: trailerUrl}} // The URL of the video to play
        style={styles.videoPlayer} // Style for the video player
        controls={true} // Show player controls
        resizeMode="cover" // The video's aspect ratio is preserved and fits within the bounds of the container
        onEnd={() => navigation.goBack()} // Optionally go back after the video has finished
        fullscreen={true}
        fullscreenOrientation="landscape"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default TrailerScreen;
