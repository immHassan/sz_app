import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Button,
  Alert,
  TextInput,
  Platform,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Animated,
  Keyboard,
} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ScheduleScreen from '../screens/ScheduleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import VideosScreen from '../screens/VideosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#f6f6f6'},
        tabBarInactiveTintColor: '#cecece',
        tabBarActiveTintColor: '#c62358',
      }}>
      <Tab.Screen
        name="Home"
        component={ScheduleScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#f6f6f6',
          },
          tabBarIcon: ({color, size}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="home-outline" color={color} size={20} />
              <Text style={{color: color, fontWeight: '900', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Schedule"
        component={GalleryScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#f6f6f6',
          },
          tabBarIcon: ({color, size}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Feather name="shopping-cart" color={color} size={20} />

              <Text style={{color: color, fontWeight: '900', fontSize: 12}}>
                Cart
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Schedule12"
        component={GalleryScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#f6f6f6',
          },
          tabBarIcon: ({color, size}) => (
            <TouchableHighlight
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                position: 'absolute',
                top: -25,
                bottom: 0,
                backgroundColor: '#fff',
                borderRadius:
                  Math.round(
                    Dimensions.get('window').width +
                      Dimensions.get('window').height,
                  ) / 2,
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: '50%', width: '80%'}}
                source={require('../assets/images/splash/icon-sm-1.png')}
              />
            </TouchableHighlight>
          ),
        })}
      />

      <Tab.Screen
        name="Favorite"
        component={SettingsScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#f6f6f6',
          },
          tabBarIcon: ({color, size}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="settings-outline" color={color} size={20} />

              <Text style={{color: color, fontWeight: '900', fontSize: 12}}>
                Setting
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        listeners={({navigation}) => ({
          tabPress: e => {
            navigation.openDrawer();
            e.preventDefault();
          },
        })}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#f6f6f6',
          },
          tabBarIcon: ({color, size}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="user-circle-o" color={color} size={20} />

              <Text style={{color: color, fontWeight: '900', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
