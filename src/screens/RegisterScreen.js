import React, {useState} from 'react';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

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
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen({navigation}) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [UserNameError, setUserNameError] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [PhoneError, setPhoneError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');

  const textInputChange = (key, val) => {
    if (val.length) {
      data[key] = val;
      setData(data);
    }
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem('@token', value);
    } catch (e) {
      // saving error
    }
  };

  const login = async () => {
    setUserNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    var body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    var config = {
      method: 'post',
      url: 'https://e717-221-132-115-66.ap.ngrok.io/api/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    };

    await axios(config)
      .then(function (response) {
        if (response.data.success) {
          //          token = response.data.data.token;
          // await
          AsyncStorage.setItem('@token', response.data.data.token).then(() => {
            AsyncStorage.getItem('@token').then(r => {
              if (r.length > 0) {
                // navigation.navigate('Home');
              } else {
                setEmailError('Something went wrong');
              }
            });
          });
        }
      })
      .catch(function (error) {
        if (!error.response.data.status) {
          if (error.response.data.data) {
            let arr = error.response.data.data;
            for (let key of Object.entries(arr)) {
              if (key[0] == 'email') {
                setEmailError(key[1][0]);
              } else if (key[0] == 'password') {
                setPasswordError(key[1][0]);
              } else if (key[0] == 'invalid') {
                setEmailError(key[1]);
              }
            }
          }
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <TouchableHighlight
          style={{
            position: 'absolute',
            top: -50,
            bottom: 0,
            backgroundColor: '#c62358',
            flex: 0.35,
            borderRadius:
              Math.round(
                Dimensions.get('window').width +
                  Dimensions.get('window').height,
              ) / 2,
            width: Dimensions.get('window').width * 0.55,
            height: Dimensions.get('window').width * 0.55,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../assets/images/logo-sm.png')} />
        </TouchableHighlight>
        <View style={{flex: 0.25}}></View>
        <View
          style={{
            flex: 0.75,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 22,
              width: 300,
              color: '#c62358',
              fontFamily: 'titillium web',
            }}>
            Let's Get Started!
          </Text>
          <Text
            style={{
              marginBottom: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 12,
              width: 300,
              fontFamily: 'louis george cafe',
              opacity: 0.699999988079071,
            }}>
            Create an account to Strike Zone to get all features
          </Text>
          <TextInput
            placeholderTextColor="#c62358"
            pla
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#fff',
              color: '#c62358',
              borderRadius: 5,
              padding: 5,
              margin: 2,
              borderColor: '#c62358',
              tintColor: '#c62358',
              borderRadius: 15,
              borderWidth: 1.5,
            }}
            placeholder="User Name"
            onChangeText={user_name => textInputChange('user_name', user_name)}
          />
          <Text style={styles.errorMsg}> {UserNameError}</Text>

          <TextInput
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              color: '#c62358',
              borderRadius: 5,
              padding: 5,
              margin: 2,
              borderColor: '#f5f5f5',
              borderRadius: 15,
              borderWidth: 1.5,
            }}
            placeholder="Email"
            onChangeText={email => textInputChange('email', email)}
          />
          <Text style={styles.errorMsg}> {EmailError}</Text>

          <TextInput
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              color: '#c62358',
              borderRadius: 5,
              padding: 5,
              margin: 2,
              borderColor: '#f5f5f5',
              borderRadius: 15,
              borderWidth: 1.5,
            }}
            placeholder="Phone"
            onChangeText={phone => textInputChange('phone', phone)}
          />
          <Text style={styles.errorMsg}> {PhoneError}</Text>

          <TextInput
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              color: '#c62358',
              borderRadius: 5,
              padding: 5,
              margin: 2,
              borderColor: '#f5f5f5',
              borderRadius: 15,
              borderWidth: 1.5,
            }}
            placeholder="Password"
            onChangeText={password => textInputChange('password', password)}
          />
          <Text style={styles.errorMsg}> {PasswordError} </Text>

          <TextInput
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              color: '#c62358',
              borderRadius: 5,
              padding: 5,
              margin: 2,
              borderColor: '#f5f5f5',
              borderRadius: 15,
              borderWidth: 1.5,
            }}
            placeholder="Confrim Password"
            onChangeText={confrim_assword =>
              textInputChange('confrim_password', confrim_password)
            }
          />
          <Text style={styles.errorMsg}> {ConfirmPasswordError} </Text>

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Confirmation',
                'Are you sure you entered correct details',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      login();
                    },
                  },
                  {text: 'No'},
                ],
              );
            }}
            style={{
              position: 'relative',
              backgroundColor: '#ed3760',
              justifyContent: 'center',
              borderRadius: 20,
              alignItems: 'center',
              height: '8%',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'louis george café',
                fontWeight: 'bold',
              }}>
              Create
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              width: 300,
              fontFamily: 'louis george cafe',
              opacity: 0.699999988079071,
              marginTop: 30,
              color: '#303030',
            }}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{
                color: '#c62358',
                fontWeight: '800',
                textDecorationLine: 'underline',
              }}>
              Login Here
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );

  /*
     <View style={styles.body}>
      <View style={styles.canvasLogoDiv}>
        <Image
          style={styles.canvasLogo}
          fadeDuration={500}
          source={require("./assets/canvas-logo.png")}
        />
      </View>

      <TextInput style={styles.emailField} placeholder="email" />
      <TextInput style={styles.emailPassword} placeholder="Password" />

      <Button
        style={styles.loginButton}
        title="Login"
        onPress={() => {
          Alert.alert(
            "Confirmation",
            "Are you sure you entered correct details",
            [
              {
                text: "Yes",
                onPress: () => {
                  login();
                },
              },
              { text: "No" },
            ]
          );
        }}
      />
    </View>

    <StatusBar style="auto" />

    <View style={styles.canvasLogoDiv}></View> 
  </SafeAreaView> */
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  errorMsg: {
    color: 'red',
  },
  canvas: {
    color: 'black',
    fontWeight: '800',
  },
  canvasLogoDiv: {
    flex: 1,
    marginTop: 80,
  },
  body: {
    flex: 2,
  },
});

export default RegisterScreen;
