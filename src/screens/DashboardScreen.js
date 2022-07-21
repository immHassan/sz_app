import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function DashboardScreen({navigation}) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  canvasLogo: {
    width: Dimensions.get('window').width,
    height: (455 * Dimensions.get('window').width) / 700, //362 is actual height of image
  },
});

export default DashboardScreen;
