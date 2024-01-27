/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {getMovieDetails} from '../api/axiosInstance';
import {useQuery} from '@tanstack/react-query';
const DetailsScreen = ({route}) => {
  const {movieId, mediaType, sideImage} = route.params;
 
  const fetchMovieDetails = useQuery({
    queryKey: ['details', movieId],
    queryFn: () => getMovieDetails(movieId, mediaType),
  });
  // console.log('movieDetails======>', movieDetails);
  // console.log('mediaType======>', mediaType);
  const {data: movieDetails, isLoading} = fetchMovieDetails;
  const opacity = useSharedValue(0); // Initial opacity is 0
  const Placeholder = () => (
    <View style={{width: 120, height: 180, backgroundColor: 'grey'}} />
  );
  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1000}); // Animate to opacity 1 over 1000ms
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const renderCreatedBy = ({item}) => (
    <View>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <Text style={[styles.generalText]}>{item.name}</Text>
    </View>
  );

  // Helper function to render seasons
  const renderSeason = ({item}) => (
    <View style={{marginRight: 10}}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={{width: 100, height: 150}}
      />
      <Text style={{color: 'white', width: 100}}>{item.name}</Text>
      {/* <Text style={{color: 'white', width: 100}}>{item.overview}</Text> */}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`,
          }}
          style={styles.imageStyle}
        />
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.gradientStyle}
        />
      </View>
      <Animated.Text style={[styles.textStyle, animatedStyle]}>
        {movieDetails?.original_title
          ? movieDetails?.original_title
          : movieDetails?.name}
      </Animated.Text>

      <View
        style={{flexDirection: 'row', paddingHorizontal: 20, marginTop: 10}}>
        {isLoading ? (
          // Render placeholder if data is loading
          <Placeholder />
        ) : (
          // Render actual image if data is loaded
          <Animated.Image
            source={{uri: sideImage}}
            style={{width: 120, height: 180}}
            sharedTransitionTag={`movie-${movieDetails?.id}`}
          />
        )}
        <View style={{flex: 1, marginLeft: 20}}>
          <Text style={styles.generalText}>
            Genres: {movieDetails?.genres.map(genre => genre.name).join(', ')}
          </Text>

          <Text style={styles.generalText}>
            Rating: {movieDetails?.vote_average} ({movieDetails?.vote_count}{' '}
            votes)
          </Text>
          <Text style={styles.generalText}>Status: {movieDetails?.status}</Text>
          {mediaType === 'tv' && (
            <Text style={styles.generalText}>
              Seasons: {movieDetails?.number_of_seasons}
            </Text>
          )}
          {mediaType === 'tv' && (
            <Text style={styles.generalText}>
              Episodes: {movieDetails?.number_of_episodes}
            </Text>
          )}
          <FlatList
            horizontal
            data={movieDetails?.created_by}
            renderItem={renderCreatedBy}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>

      <View style={{padding: 20}}>
        <Text
          style={[styles.generalText, {fontWeight: 'bold', marginBottom: 10}]}>
          Synopsis:
        </Text>
        {movieDetails?.tagline && (
          <Text style={[styles.generalText, {marginBottom: 10}]}>
            {movieDetails?.tagline}
          </Text>
        )}
        {movieDetails?.overview && (
          <Text style={styles.generalText}>{movieDetails?.overview}</Text>
        )}
      </View>
      {mediaType === 'tv' && (
        <View style={{padding: 20}}>
          <Text
            style={[
              styles.generalText,
              {fontWeight: 'bold', marginBottom: 10},
            ]}>
            Seasons:
          </Text>
          <FlatList
            horizontal
            data={movieDetails?.seasons}
            renderItem={renderSeason}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}

      {/* Additional details like production companies and networks could go here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set the background color to black
  },
  imageStyle: {
    height: 200,
  },
  gradientStyle: {
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Set text color to white
    marginTop: 20,
    textAlign: 'center',
  },
  generalText: {
    color: 'white', // Set text color to white
  },
  // ... other styles you have, making sure to set text color to white
});

export default DetailsScreen;
