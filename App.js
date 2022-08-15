/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppStack from './src/navigations/AppStack';
import AuthStack from './src/navigations/AuthStack';

import {Provider} from 'react-redux';

import {persistor, store} from './src/store/index';

import {PersistGate} from 'redux-persist/lib/integration/react';

const Drawer = createDrawerNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [authToken, setauthToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('authToken', (err, result) => {
      if (result) {
        // result = '';
        setauthToken(result);
      } else {
        setauthToken('');
      }
    });
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        {authToken == '' ? <AuthStack></AuthStack> : <AppStack></AppStack>}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
