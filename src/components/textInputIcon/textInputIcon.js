import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {THEME,WHITE} from '../../utils/colors'

export const TextInputIcon = (props) => {
  const {iconName} = props
  return (
    <Icon name={iconName} size={25} color={WHITE} />
  );
};
export const TextInputIcon1 = (props) => {
  const {iconName} = props
  return (
    <Ionicons name={iconName} size={25} color={WHITE} />
  );
};
export const BottomIcon = (props) => {
  const {iconName} = props
  return (
    <Icon name={iconName} size={25} color={WHITE} />
  );
};

export const BottomIcon1 = (props) => {
  const {iconName} = props
  return (
    <Ionicons name={iconName} size={25} color={WHITE} />
  );
};

export const BottomIcon2 = (props) => {
  const {iconName} = props
  return (
    <FontAwesome5 name={iconName} size={23} color={WHITE} />
  );
};

export const EditProfile = (props) => {
  const {iconName,colorName} = props
  return (
    <Icon name={iconName} size={28} color={colorName} />
  );
};

export const EditProfilePic = (props) => {
  const {iconName,colorName} = props
  return (
    <MaterialIcons name={iconName} size={15} color={colorName} />
  );
};

export const EditProfileLogout = (props) => {
  const {iconName,colorName,size=28} = props
  return (
    <AntDesign name={iconName} size={size} color={colorName} />
  );
};

export const EditProfilePrivacy = (props) => {
  const {iconName,colorName} = props
  return (
    <MaterialCommunityIcons name={iconName} size={28} color={colorName} />
  );
};

export const FunIcons = (props) => {
  const {iconName,colorName} = props
  return (
    <AntDesign name={iconName} size={15} color={colorName} />
  );
};