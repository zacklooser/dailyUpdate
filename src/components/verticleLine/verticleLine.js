import React from 'react';
import { View} from 'react-native';
import {THEME} from '../../utils/colors'

export const VerticalLine = (
  
) => {
  return (
    <View
      style={{
       //marginLeft: 10,
        borderLeftWidth: 15,
        borderLeftColor: THEME,
        height: '100%',
        alignSelf: 'center',
        backgroundColor: THEME
      }}
    />
  );
};
