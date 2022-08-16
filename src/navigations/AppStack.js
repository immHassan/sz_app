import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';

import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MomentsScreen from '../screens/MomentsScreen';

import GalleryScreen from '../screens/GalleryScreen';

import SettingsScreen from '../screens/SettingsScreen';

import TabNavigator from './TabNavigator';
import ScheduleScreen from '../screens/ScheduleScreen';

import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import {Dimensions} from 'react-native';
import AuthStack from './AuthStack';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const AppStack = ({UserReducer, user_logout, user_login}) => {
  const [appStack, setappStack] = React.useState(true);

  React.useEffect(() => {
    console.log('UserReducer', UserReducer);

    AsyncStorage.getItem('authToken', (err, result) => {
      if (result) {
        user_login();
        setappStack(true);
      }
    });

    if (UserReducer) {
      setappStack(true);
    } else {
      setappStack(false);
    }
  }, [UserReducer]);

  const logout = () => {
    user_logout();
  };

  return !appStack ? (
    <AuthStack> </AuthStack>
  ) : (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer logout={logout} {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {width: '60%'},
        drawerItemStyle: {
          height: Dimensions.get('window').height * 0.04,
          marginTop: Dimensions.get('window').height * 0.01,
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
          color: 'gray',
          borderColor: 'gray',
          borderBottomWidth: 2,
          height: Dimensions.get('window').height * 0.04,
        },
      }}>
      <Drawer.Screen name="Home" component={TabNavigator} options={{}} />
      <Drawer.Screen name="Classes" component={TabNavigator} options={{}} />

      <Drawer.Screen name="About" component={ProfileScreen} />

      <Drawer.Screen name="Membership" component={MessagesScreen} />

      <Drawer.Screen name="Rental" component={MomentsScreen} />

      <Drawer.Screen name="Rental Products" component={MomentsScreen} />

      <Drawer.Screen name="Images" component={TabNavigator} />

      <Drawer.Screen name="MomentsScreen" component={MomentsScreen} />

      <Drawer.Screen name="Settings" component={MomentsScreen} />

      <Drawer.Screen name="Profile Settings" component={MomentsScreen} />

      <Drawer.Screen name="Password Settings" component={MomentsScreen} />
    </Drawer.Navigator>
  );
};

// export default LogIn;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(AppStack);
