/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';

const DetailsScreen = ({route}) => {
  // Helper function to render creators
  const {movieDetails, mediaType} = route.params;
  const renderCreatedBy = ({item}) => (
    <View>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`}}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <Text>{item.name}</Text>
    </View>
  );

  // Helper function to render seasons
  const renderSeason = ({item}) => (
    <View>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={{width: 100, height: 150}}
      />
      <Text>{item.name}</Text>
      <Text>{item.overview}</Text>
    </View>
  );

  return (
    <ScrollView>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`,
        }}
        style={{height: 200}}
      />

      <View style={{flexDirection: 'row', padding: 20}}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
          style={{width: 120, height: 180}}
        />
        <View style={{flex: 1, marginLeft: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {movieDetails.name}
          </Text>
          <Text style={{fontStyle: 'italic'}}>{movieDetails.tagline}</Text>
          <Text>
            Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}
          </Text>
          <FlatList
            horizontal
            data={movieDetails.created_by}
            renderItem={renderCreatedBy}
            keyExtractor={item => item.id.toString()}
          />
          <Text>
            Rating: {movieDetails.vote_average} ({movieDetails.vote_count}{' '}
            votes)
          </Text>
          <Text>Status: {movieDetails.status}</Text>
          <Text>Seasons: {movieDetails.number_of_seasons}</Text>
          <Text>Episodes: {movieDetails.number_of_episodes}</Text>
        </View>
      </View>

      <View style={{padding: 20}}>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Synopsis:</Text>
        <Text>{movieDetails.overview}</Text>
      </View>

      <View style={{padding: 20}}>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Seasons:</Text>
        <FlatList
          horizontal
          data={movieDetails.seasons}
          renderItem={renderSeason}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Additional details like production companies and networks could go here */}
    </ScrollView>
  );
};

export default DetailsScreen;
