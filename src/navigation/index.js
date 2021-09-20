import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useSelector} from 'react-redux';
import CreateAccount from '../screens/createAccount/index';
import Login from '../screens/login/index';
import News from '../screens/news/index';
import Fun from '../screens/fun/index';
import Profile from '../screens/profile/index';
import Favourites from '../screens/favourites/index';
import {
  BottomIcon,
  BottomIcon1,
  BottomIcon2,
} from '../components/textInputIcon/textInputIcon';
import {THEME} from '../utils/colors';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#f79d8d"
      barStyle={{backgroundColor: THEME}}>
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: () => <BottomIcon iconName="newsletter" />,
        }}
      />
      <Tab.Screen
        name="FunN"
        component={Fun}
        options={{
          tabBarLabel: 'FunN',
          tabBarIcon: () => <BottomIcon2 iconName="laugh" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarVisible: true,
          tabBarIcon: () => <BottomIcon1 iconName="person" />,
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const state = useSelector(state => state.login);
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator
        mode="modal"
        screenOptions={{gestureEnabled: false}}
        initialRouteName={state.remember ? 'BottomTab' : 'Login'}>
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{headerShown: false,tabBarVisible:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
