import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {UserState} from 'realm';

const ProfilePasswordScreen = () => {
  const [passToastr, setpassToastr] = useState(false);

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c62358',
          height: '20%',
          width: '100%',
        }}>
        <Text style={{color: '#fff', fontSize: 25, fontWeight: '700'}}>
          Change Password
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          width: '100%',
          borderRadius: Dimensions.get('screen').width * 0.09,
          bottom: Dimensions.get('screen').width * 0.08,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: Dimensions.get('screen').width * 0.04,
            marginTop: Dimensions.get('screen').height * 0.03,
            margin: 25,
          }}>
          <Text style={styles.textHeading}>Current Password</Text>
          <TextInput
            secureTextEntry={true}
            defaultValue="11111111"
            style={styles.TextInputVal}
            underlineColorAndroid="transparent"
          />

          <Text style={styles.textHeading}>New Password</Text>
          <TextInput
            secureTextEntry={true}
            defaultValue="11111111"
            style={styles.TextInputVal}
            underlineColorAndroid="transparent"
          />

          <Text style={styles.textHeading}>Re-Enter Password</Text>
          <TextInput
            secureTextEntry={true}
            defaultValue="11111111"
            style={styles.TextInputVal}
            placeholder="Password"
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            style={{
              position: 'relative',
              backgroundColor: '#c62358',
              justifyContent: 'center',
              borderRadius: 20,
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: 8,
              width: '100%',
              marginTop: 20,
            }}>
            <Text
              onPress={() => {
                setpassToastr(true);
              }}
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'louis george café',
                fontWeight: '800',
              }}>
              Update Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              display: passToastr ? 'flex' : 'none',
              position: 'relative',
              backgroundColor: '#00b853',
              justifyContent: 'center',
              borderRadius: 5,
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: 8,
              width: '100%',
              height: '12%',
              top: Dimensions.get('screen').height * 0.2,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                fontFamily: 'louis george café',
              }}>
              Your Password has been updated
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeading: {
    color: 'gray',
    marginLeft: 5,
    marginBottom: 0,
  },
  TextInputVal: {
    fontSize: 16,
    fontFamily: 'Louis George Cafe',
    fontWeight: 'bold',
    color: '#000',
    borderRadius: 5,
    padding: 2,
    tintColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    marginTop: 0,
  },
});

export default ProfilePasswordScreen;
