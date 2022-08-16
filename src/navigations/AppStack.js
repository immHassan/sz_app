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

  const Profile = () => {
    return <TabNavigator data={'Profile'}></TabNavigator>;
  };
  const Home = () => {
    return <TabNavigator data={'Home'}></TabNavigator>;
  };
  const MemberShip = () => {
    return <TabNavigator data={'messageScreen'}></TabNavigator>;
  };
  const Rental = () => {
    return <TabNavigator data={'rental'}></TabNavigator>;
  };
  const Images = () => {
    return <TabNavigator data={'images'}></TabNavigator>;
  };
  const Setting = () => {
    return <TabNavigator data={'ProfileSetting'}></TabNavigator>;
  };
  const MomScreen = () =>{
    return <TabNavigator data={'MomentsScreen'}></TabNavigator>;
  }

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
      <Drawer.Screen name="Home" component={Home} options={{}} />
      <Drawer.Screen name="Profile" component={Profile} />
      {/* screen MemberShip = MessageScree */}
      <Drawer.Screen name="Membership" component={MemberShip} />
      {/* rental = MomentsScreen */}
      <Drawer.Screen name="Rental" component={Rental} />

      <Drawer.Screen name="Rental Products" component={Rental} />

      <Drawer.Screen name="Images" component={Images} />

      <Drawer.Screen name="MomentsScreen" component={MomScreen} />

      <Drawer.Screen name="Profile Settings" component={Setting} />

      <Drawer.Screen name="Password Settings" component={MomentsScreen} />
    </Drawer.Navigator>
  );
};

// export default LogIn;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(AppStack);
