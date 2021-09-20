import React from 'react';
import {View} from 'react-native';
import {THEME} from '../../utils/colors';

export const HorizontalLine = () => {
  return (
    <View
      style={{
        marginTop:10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        width:'100%'
      }}
    />
  );
};
