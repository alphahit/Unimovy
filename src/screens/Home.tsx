import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Header from '../components/Header';
import {fetchTrendingData} from '../api/axiosInstance';
interface HomeProps {
  navigation: any; // Declaring navigation prop as any
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [pressed, setPressed] = useState(false);
  const [trendingData, setTrendingData] = useState(null);
  const scale = useSharedValue(1);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await fetchTrendingData();
        console.log('fetchTrendingData=======>', JSON.stringify(data));
        setTrendingData(data);
      } catch (error) {
        console.error('Error fetching series data:', error);
      }
    };

    fetchTrending();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  const renderItem = ({item}) => {
    // Determine the image URL
    // The Movie Database typically uses a base URL for image paths, which you will need to prepend to the poster_path from the data.
    // Assuming the base URL is "https://image.tmdb.org/t/p/w500" for a width of 500 pixels.
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
      <View style={{padding: 10}}>
        <Image
          source={{uri: imageUrl}}
          style={{width: 150, height: 225}} // Adjust the height accordingly to maintain the aspect ratio.
        />
        <Text style={{color: 'white'}}>{item.title || item.name}</Text>
        <Text style={{color: 'white'}}>
          Release Date: {item.release_date || item.first_air_date}
        </Text>
        <Text style={{color: 'white'}}>Average Vote: {item.vote_average}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={{marginTop:60}}>
        {/* {trendingData && (
        <Text style={styles.seriesInfo}>{trendingData?.title}</Text> // Display some data from the series
      )} */}
        <FlatList
          data={trendingData ? trendingData.results : []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
        <Pressable
          style={[styles.button, pressed ? styles.buttonPressed : null]}
          onPress={() => navigation.navigate('Details')}
          onPressIn={() => {
            setPressed(true);
            scale.value = withSpring(1.1);
          }}
          onPressOut={() => {
            setPressed(false);
            scale.value = withSpring(1);
          }}>
          <Animated.View style={[animatedStyle]}>
            <Text style={styles.buttonText}>Details</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  buttonPressed: {
    backgroundColor: '#4682b4',
  },
  seriesInfo: {
    color: 'white',
    marginVertical: 10, // Add some spacing around the text
  },
});

export default Home;
