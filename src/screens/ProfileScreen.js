import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('screen').height * 0.4,
          width: '100%',
        }}>
        <Image
          source={require('../assets/images/profile.png')}
          style={{
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#c62358',
          borderTopLeftRadius: Dimensions.get('screen').width * 0.2,
          height: '100%',
          bottom: Dimensions.get('screen').height * 0.1,
        }}>
        <View
          style={{
            margin: Dimensions.get('screen').width * 0.07,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 25,
              fontWeight: '700',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            John Alexander
          </Text>

          <View>
            <Text style={styles.textHeading}>Full Name</Text>
            <TextInput
              defaultValue="John Alexander"
              style={styles.TextInputVal}
              placeholder="Password"
              underlineColorAndroid="transparent"
            />

            <Text style={styles.textHeading}>Email</Text>
            <TextInput
              defaultValue="Alexander@yourdomain.com"
              style={styles.TextInputVal}
              placeholder="Password"
              underlineColorAndroid="transparent"
            />

            <Text style={styles.textHeading}>Phone</Text>
            <TextInput
              defaultValue="+00 000 0000 "
              style={styles.TextInputVal}
              placeholder="Password"
              underlineColorAndroid="transparent"
            />

            <Text style={styles.textHeading}>Location</Text>
            <TextInput
              defaultValue="8084 Littleton Ave
              East Elmhurst, NY 11370
              "
              style={styles.TextInputVal}
              placeholder="Password"
              underlineColorAndroid="transparent"
            />

            <TouchableOpacity
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center',
                alignSelf: 'center',
                paddingVertical: 8,
                width: '60%',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#c62358',
                  fontSize: 16,
                  fontFamily: 'louis george café',
                  fontWeight: '800',
                }}>
                Update Information
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeading: {
    color: '#ffff',
    marginLeft: 5,
    marginBottom: 0,
  },
  TextInputVal: {
    fontSize: 14,
    fontFamily: 'Louis George Cafe',
    fontWeight: 'bold',
    color: '#ffff',
    borderRadius: 5,
    padding: 2,
    tintColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
    marginTop: 0,
  },
});

export default ProfileScreen;
