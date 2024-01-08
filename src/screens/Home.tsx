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
import {MovieItem} from '../types';
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

  const renderItem = ({item}: {item: MovieItem}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
      <Pressable
        style={{padding: 10}}
        onPress={() => {
          navigation.navigate('Details', {
            movieId: item.id,
            mediaType: item.media_type,
            sideImage: imageUrl,
          });
        }}>
        <Animated.Image
          source={{uri: imageUrl}}
          style={{width: 150, height: 225}}
          sharedTransitionTag={`movie-${item.id}`}
        />
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            right: 15,
            top: 15,
            position: 'absolute',
          }}>
          <AntDesign
            name="heart"
            size={25}
            color="white"
            //style={{transform: [{rotate: isDrawerOpen ? '180deg' : '0deg'}]}}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#2D0E08',
            width: 150,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            paddingHorizontal: 2,
          }}>
          <Text style={{color: 'white'}}>{item.title || item.name}</Text>
          <Text style={{color: 'white'}}>
           {item.release_date || item.first_air_date}
          </Text>
        </View>
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

      <View style={{marginTop: 75, width: '100%'}}>
        <FlatList
          data={
            // Check if searchData has results and use it if available, otherwise fallback to trendingData
            searchData && searchData.results.length > 0
              ? searchData.results
              : trendingData
              ? trendingData.results
              : []
          }
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
        />
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
