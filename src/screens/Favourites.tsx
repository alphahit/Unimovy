import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useMMKVObject} from 'react-native-mmkv';
import Header from '../components/Header';

// Assuming your MovieItem type matches the structure of your favorites data
type MovieItem = {
  id: number;
  title: string;
  poster_path: string;
  name: string;
};

  
  const Favourites: React.FC = ({navigation}) => {
  const [favorites, setFavorites] = useMMKVObject<MovieItem[]>('favorites');
  const deleteFavorites = item => {
    let updatedFavorites = Array.isArray(favorites) ? [...favorites] : [];
    const index = updatedFavorites.findIndex(fav => fav.id === item.id);
    if (index !== -1) {
      console.log('first ======>', index);
      updatedFavorites.splice(index, 1);
    }
    setFavorites(updatedFavorites);
  };
  const renderItem = ({item}: {item: MovieItem}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          deleteFavorites(item);
        }}>
        {/* {console.log(item)} */}
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.title}>{item.title ? item.title : item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header isFavoritePage={true} navigation={navigation}/>
      <View style={{marginTop: 75}}>
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  image: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  // ... Add more styles as needed
});
