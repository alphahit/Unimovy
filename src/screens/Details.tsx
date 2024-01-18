/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable} from 'react-native';

interface DetailsProps {
  navigation: any; // Declaring navigation prop as any
}

const Details: React.FC<DetailsProps> = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Text>Details</Text>
    </View>
  );
};

export default Details;
