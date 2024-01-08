/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SearchBar from './SearchBar';
import {HeaderProps} from '../types';

const Header: React.FC<HeaderProps> = ({
  navigation,
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '5%',
        }}>
        <TouchableOpacity onPress={toggleDrawer} style={{marginLeft: 10}}>
          <MaterialCommunityIcons
            name="forwardburger"
            size={30}
            color="white"
            //style={{transform: [{rotate: isDrawerOpen ? '180deg' : '0deg'}]}}
          />
        </TouchableOpacity>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 75,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
});
