import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {THEME, WHITE} from '../../utils/colors';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 14, color: WHITE},
        tabBarStyle: {backgroundColor: THEME},
        tabBarIndicatorStyle:{backgroundColor: WHITE},
      }}>
      <Tab.Screen name="Jokes" component={HomeScreen} />
      <Tab.Screen name="Memes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
