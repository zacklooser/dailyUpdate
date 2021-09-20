import React from 'react';
import {ImageBackground} from 'react-native';
import {styles} from './style'

export const BackgroundTheme = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
    />
  );
};