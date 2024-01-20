// SearchBar.js
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.searchBar__clicked}>
      <AntDesign
        name="search1"
        size={25}
        color="white"
        style={{marginLeft: 1}}
        //style={{transform: [{rotate: isDrawerOpen ? '180deg' : '0deg'}]}}
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        onFocus={() => {
          setClicked(true);
        }}
      />

      {clicked && (
        <TouchableOpacity style={{position: 'absolute', right: 10}}>
          <AntDesign
            name="close"
            size={25}
            color="white"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase('');
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  searchBar__clicked: {
    position: 'absolute',
    bottom: -15,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#5D1000',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
    color: 'white',
  },
});
