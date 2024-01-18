import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

interface HeaderProps {
  navigation: any;
}

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer} style={{marginLeft: 10}}>
        <MaterialCommunityIcons
          name="forwardburger"
          size={30}
          color="white"
          //style={{transform: [{rotate: isDrawerOpen ? '180deg' : '0deg'}]}}
        />
      </TouchableOpacity>
      <Text style={{marginLeft: -10}}>Home</Text>
      <View style={{width: 30}} />
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
    height: 60,
    backgroundColor: '#1e90ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
});
