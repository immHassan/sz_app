import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen1 from '../screens/SplashScreen1';
import SplashScreen2 from '../screens/SplashScreen2';
import SplashScreen3 from '../screens/SplashScreen3';

import SplashScreen4 from '../screens/SplashScreen4';

import SplashScreen5 from '../screens/SplashScreen5';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';

import AppStack from '../navigations/AppStack';

import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AuthStack = ({UserReducer, user_logout, user_login}) => {
  const [appStack, setappStack] = React.useState(false);

  React.useEffect(() => {
    console.log('UserReducer ---------', UserReducer);

    AsyncStorage.getItem('authToken', (err, result) => {
      console.log('result', result);
      if (result) {
        user_login();
        setappStack(true);
      }
    });

    if (UserReducer.isUserLogin) {
      setappStack(true);
    } else {
      setappStack(false);
    }
  }, [UserReducer]);

  return appStack ? (
    <AppStack> </AppStack>
  ) : (
    <Stack.Navigator
      initialRouteName="Splash1"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash1" component={SplashScreen1} />
      <Stack.Screen name="Splash2" component={SplashScreen2} />
      <Stack.Screen name="Splash3" component={SplashScreen3} />
      <Stack.Screen name="Splash4" component={SplashScreen4} />
      <Stack.Screen name="Splash5" component={SplashScreen5} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// export default LogIn;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(AuthStack);
