/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {fetchImdbData, getMovieDetails} from '../api/axiosInstance';
import {useQuery} from '@tanstack/react-query';
const DetailsScreen = ({route, navigation}) => {
  const {movieId, mediaType, sideImage} = route.params;
  const [setIsLoad, isLoad] = useState(false)
  const [trailerUrl, setTrailerUrl] = useState('');
  const fetchMovieDetails = useQuery({
    queryKey: ['details', movieId],
    queryFn: () => getMovieDetails(movieId, mediaType),
  });
  // console.log('movieDetails======>', movieDetails);
  // console.log('mediaType======>', mediaType);
  const {data: movieDetails, isLoading} = fetchMovieDetails;
  console.log('movieDetails======>', movieDetails);
  const handleImdb = async () => {
    setIsLoad(true);
    const res = await fetchImdbData(movieDetails?.imdb_id);
    console.log(
      'res?.primaryVideos.edges===>',
      JSON.stringify(res?.primaryVideos.edges),
    );

    // Assuming res is the response and has the structure as you logged
    if (res?.primaryVideos.edges.length > 0) {
      const firstVideo = res.primaryVideos.edges[0].node;
      if (firstVideo.playbackURLs && firstVideo.playbackURLs.length > 0) {
        const trailerUrl = firstVideo.playbackURLs[0].url; // Get the URL of the first trailer
        console.log('Trailer URL:', trailerUrl);
        if (trailerUrl.length > 0) {
          navigation.navigate('TrailerScreen', {trailerUrl});
        }

        // Here you can set the trailer URL in your component's state or directly use it to play the video
        // For example, if using useState:
        //setTrailerUrl(trailerUrl);

        // If directly playing the video, ensure you have a video player ready to use this URL
      } else {
        console.log('No trailers available for this movie.');
      }
    } else {
      console.log('No video data available.');
    }
  };
  //const trailerUrl = movieDetails.primaryVideos.edges[0].node.playbackURLs[0].url;
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
          style={styles.gradientStyle}>
          <TouchableOpacity
            onPress={() => handleImdb()}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: 5,
              borderWidth: 2,
              paddingHorizontal: 10,
              paddingVertical: 5,
              top: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{marginRight: 5}}>Trailer</Text>
            <AntDesign
              name="playcircleo"
              size={20}
              color={'black'}
              //style={{transform: [{rotate: isDrawerOpen ? '180deg' : '0deg'}]}}
            />
          </TouchableOpacity>
        </LinearGradient>
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
      {/* {trailerUrl !== '' && (
        <Video
          source={{uri: trailerUrl}} // The URL of the video to play
          //style={styles.videoPlayer} // Style for the video player
          controls={true} // Show player controls
          resizeMode="contain" // The video's aspect ratio is preserved and fits within the bounds of the container
        />
      )} */}
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
    alignItems: 'flex-end',
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
