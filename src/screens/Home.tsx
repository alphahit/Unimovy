/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  //withSpring,
} from 'react-native-reanimated';
import Header from '../components/Header';
import {
  fetchTrendingData,
  getMovieDetails,
  getSearchResults,
} from '../api/axiosInstance';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import useDebounce from '../utils/useDebounce';


interface HomeProps {
  navigation: any; // Declaring navigation prop as any
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  //const [pressed, setPressed] = useState(false);
  //const [trendingData, setTrendingData] = useState(null);
  const [page, setPage] = useState(1);
  //const scale = useSharedValue(1);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const debouncedSearchPhrase = useDebounce(searchPhrase, 500);
  const fetchTrendingQuery = useQuery({
    queryKey: ['trending', page],
    queryFn: () => fetchTrendingData(page),
  });

  // const searchQuery = useQuery({
  //   queryKey: ['search', searchPhrase],
  //   queryFn: () => getSearchResults(searchPhrase),
  // });
  const searchQuery = useQuery({
    queryKey: ['search', debouncedSearchPhrase],
    queryFn: () => getSearchResults(debouncedSearchPhrase),
    enabled: debouncedSearchPhrase.length > 0, // Only run query if search phrase is not empty
  });
  const {data: trendingData} = fetchTrendingQuery;
  const {data: searchData} = searchQuery;

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{scale: scale.value}],
  //   };
  // });
  const renderItem = ({item}) => {
    // Determine the image URL
    // The Movie Database typically uses a base URL for image paths, which you will need to prepend to the poster_path from the data.
    // Assuming the base URL is "https://image.tmdb.org/t/p/w500" for a width of 500 pixels.
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
      <Pressable
        style={{padding: 10}}
        onPress={async () => {
          // Since you're using async/await, ensure that the getMovieDetails function is properly defined to handle the API call.
          try {
            const data = await getMovieDetails(item.id, item.media_type);
            console.log('navigate data====>', data);
            Object.keys(data).length > 0 &&
              navigation.navigate('Details', {
                movieDetails: data,
                mediaType: item.media_type,
              });
          } catch (error) {
            console.error('Error fetching details:', error);
          }
        }}>
        <ImageBackground
          source={{uri: imageUrl}}
          style={{width: 150, height: 225}} // Adjust the height accordingly to maintain the aspect ratio.
        >
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginRight: 5, marginTop: 5}}>
            <AntDesign
              name="heart"
              size={25}
              color="white"
              //style={{transform: [{rotate: isDrawerOpen ? '180deg' : '0deg'}]}}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={{color: 'white'}}>{item.title || item.name}</Text>
        <Text style={{color: 'white'}}>
          Release Date: {item.release_date || item.first_air_date}
        </Text>
        <Text style={{color: 'white'}}>Average Vote: {item.vote_average}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
  {console.log("Search Data======>",searchData)}
      <View style={{marginTop: 120, width: '100%'}}>
        {/* {trendingData && (
        <Text style={styles.seriesInfo}>{trendingData?.title}</Text> // Display some data from the series
      )} */}
        <FlatList
          data={trendingData ? trendingData.results : []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
        {/* <Pressable
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
        </Pressable> */}
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
