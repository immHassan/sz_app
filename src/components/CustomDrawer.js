import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#fff'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: Dimensions.get('window').height * 0.02,
            marginTop: Dimensions.get('window').height * 0.05,
          }}>
          <View>
            <Image
              source={require('../assets/images/profile.jpg')}
              style={{
                height: Dimensions.get('window').height * 0.1,
                width: Dimensions.get('window').height * 0.1,
                borderRadius: Dimensions.get('window').height * 0.05,
              }}
            />
          </View>

          <View
            style={{
              margin: Dimensions.get('window').height * 0.01,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: Dimensions.get('window').height * 0.025,
                fontWeight: '800',
              }}>
              John William
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: Dimensions.get('window').height * 0.02,
                fontWeight: '500',
              }}>
              Designation
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'gray',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: Dimensions.get('window').height * 0.0015,
            marginHorizontal: Dimensions.get('window').width * 0.02,
            marginTop: Dimensions.get('window').height * 0.008,
          }}></View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            marginTop: Dimensions.get('window').height * 0.005,
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 10, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <TouchableOpacity
              onPress={() => {
                props.logout();
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
