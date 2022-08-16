import React, {useState, useEffect} from 'react';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

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

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

function ModalPopup({visible, children}) {
  const [showModal, setshowModal] = React.useState(visible);

  const scaleValue = React.useRef(new Animated.Value(1000)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setshowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      setshowModal(false);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal visible={showModal} animationType={'fade'} transparent={true}>
      <Animated.View
        style={{
          flex: 1,
          blurRadius: '10',
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale: scaleValue}],
        }}>
        {children}
      </Animated.View>
    </Modal>
  );
}

function LoginScreen({navigation, UserReducer, user_login}) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [inputBackgroundPassword, setinputBackgroundPassword] =
    React.useState('gray');

  const [inputBackgroundPasswordCn, setinputBackgroundPasswordCn] =
    React.useState('gray');

  const [inputBackgroundEmail, setinputBackgroundEmail] =
    React.useState('gray');

  const [visible, setvisible] = React.useState(false);

  const [forgetPassword, setforgetPassword] = React.useState(true);
  const [resetPassword, setresetPassword] = React.useState(false);
  const [otp, setotp] = React.useState(false);
  const [passwordChanged, setpasswordChanged] = React.useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const textInputChange = (key, val) => {
    if (val.length) {
      data[key] = val;
      setData(data);
    }
  };

  const login = async () => {
    // navigation.navigate('Register');
    // return false;
    setEmailError('');
    setPasswordError('');
    var body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    var config = {
      method: 'post',
      url: 'https://b4a7-37-111-136-145.ap.ngrok.io/api/login',
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
                navigation.navigate('Home');
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

  const _onPressLogIn = () => {
    setEmailError('');
    setPasswordError('');
    var body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    user_login(body).then(() => {
      if (!UserReducer.success) {
        if (UserReducer.data) {
          let arr = UserReducer.data;
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
      } else {
        setEmailError('');
        setPasswordError('');
        console.log('success', UserReducer);
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
        <View style={{flex: 0.27}}></View>
        <View
          style={{
            flex: 0.73,
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
            Welcome
          </Text>

          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 12,
              width: 300,
              fontFamily: 'louis george cafe',
              opacity: 0.699999988079071,
            }}>
            Login to your existing account of Strike Zone.
          </Text>

          <View
            style={{
              marginTop: '3%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 0.5,
              borderColor: inputBackgroundEmail,
              height: '8%',
              borderRadius: 15,
              margin: 0,
              borderWidth: 1,
            }}>
            <Feather
              style={{marginLeft: 10}}
              color={inputBackgroundEmail}
              name="user-plus"
              size={18}
            />
            <TextInput
              onFocus={() => setinputBackgroundEmail('#c62358')}
              onBlur={() => setinputBackgroundEmail('gray')}
              placeholderTextColor={inputBackgroundEmail}
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'Louis George Café',
                backgroundColor: '#fff',
                color: '#c62358',
                borderRadius: 5,
                padding: 5,
                margin: 2,
                borderColor: '#c62358',
                tintColor: '#c62358',
              }}
              placeholder="User Name"
              underlineColorAndroid="transparent"
              onChangeText={email => textInputChange('email', email)}
            />
          </View>

          <Text style={styles.errorMsg}> {emailError}</Text>

          <View
            style={{
              marginTop: '3%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 0.5,
              borderColor: inputBackgroundPassword,
              height: '8%',
              borderRadius: 15,
              margin: 0,
              borderWidth: 1,
            }}>
            <Feather
              style={{marginLeft: 10}}
              color={inputBackgroundPassword}
              name="unlock"
              size={18}
            />

            <TextInput
              onFocus={() => setinputBackgroundPassword('#c62358')}
              onBlur={() => setinputBackgroundPassword('gray')}
              secureTextEntry={true}
              placeholderTextColor={inputBackgroundPassword}
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Louis George Cafe',
                opacity: 0.69,
                fontWeight: 'bold',
                backgroundColor: '#fff',
                color: '#c62358',
                borderRadius: 5,
                padding: 5,
                margin: 2,
                tintColor: '#c62358',
              }}
              placeholder="Password"
              underlineColorAndroid="transparent"
              onChangeText={password => textInputChange('password', password)}
            />
          </View>
          <Text style={styles.errorMsg}> {passwordError} </Text>

          <TouchableOpacity
            onPress={() => {
              setotp(false);
              setforgetPassword(true);
              setresetPassword(false);
              setpasswordChanged(false);
              setvisible(true);
            }}>
            <Text
              style={{
                textAlign: 'right',
                fontWeight: '900',
                fontSize: 14,
                width: '100%',
                fontFamily: 'louis george cafe',
                color: '#303030',
                textDecorationLine: 'underline',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // setotp(true);
              // setforgetPassword(false);
              // setresetPassword(false);
              // setpasswordChanged(false);
              // setvisible(true);
              _onPressLogIn();
            }}
            style={{
              position: 'relative',
              backgroundColor: '#ed3760',
              justifyContent: 'center',
              borderRadius: 20,
              alignItems: 'center',
              height: '8%',
              marginTop: '3%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'louis george café',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              width: 300,
              fontFamily: 'louis george cafe',
              opacity: 0.699999988079071,
              marginTop: '3%',
              color: 'gray',
            }}>
            Or connect using
          </Text>

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
              backgroundColor: '#4267b2',
              justifyContent: 'center',
              borderRadius: 20,
              alignItems: 'center',
              height: '8%',
              marginTop: '3%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'louis george café',
              }}>
              <EvilIcons name="sc-facebook" size={25} />

              <Text> Facebook</Text>
            </Text>
          </TouchableOpacity>

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
              backgroundColor: '#1da1f2',
              justifyContent: 'center',
              borderRadius: 20,
              alignItems: 'center',
              height: '8%',
              marginTop: '3%',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'louis george café',
              }}>
              <EvilIcons name="sc-twitter" size={25} />

              <Text>Twitter</Text>
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: 'center',
              fontWeight: '900',
              fontSize: 16,
              fontFamily: 'louis george cafe',
              opacity: 0.699999988079071,
              marginTop: '8%',
              color: '#303030',
            }}>
            Don't have an account?
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{
                color: '#c62358',
                fontWeight: 'bold',
                fontSize: 17,
                textDecorationLine: 'underline',
              }}>
              {' '}
              Sign Up
            </Text>
          </Text>
        </View>
      </View>

      <ModalPopup visible={visible}>
        {forgetPassword === true ? (
          <View
            style={{
              width: '100%',
              height: isKeyboardVisible ? '100%' : '50%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              elevation: 20,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: '-7%',
              }}>
              <Text
                onPress={() => {
                  setvisible(false);
                }}
                style={{
                  color: 'lightgray',
                  fontSize: 30,
                  fontWeight: '900',
                  position: 'relative',
                }}
                transparent>
                __
              </Text>
            </View>

            <Text
              style={{
                fontWeight: '800',
                fontSize: 24,
                width: '100%',
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: '3%',
              }}>
              Forgot Password
            </Text>

            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                width: '100%',
                fontFamily: 'louis george cafe',
                color: 'lightgrgraay',
                marginTop: '1%',
              }}>
              Enter your email for the verification process, We will send 4
              digits code to your email
            </Text>

            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                width: 300,
                fontFamily: 'louis george cafe',
                color: '',
                marginTop: '5%',
              }}>
              Email:
            </Text>

            <TextInput
              placeholderTextColor="#c62358"
              pla
              style={{
                marginTop: '3%',
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: '#fff',
                color: '#c62358',
                borderRadius: 5,
                padding: 5,
                borderColor: '#c62358',
                tintColor: '#c62358',
                borderRadius: 15,
                borderWidth: 1.5,
              }}
              placeholder="John@domain.com"
            />

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
                height: '15%',
                marginTop: '3%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'louis george café',
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {otp === true ? (
          <View
            style={{
              width: '100%',
              height: isKeyboardVisible ? '100%' : '50%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              elevation: 20,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: '-7%',
              }}>
              <Text
                onPress={() => {
                  setvisible(false);
                }}
                style={{
                  color: 'lightgray',
                  fontSize: 30,
                  fontWeight: '900',
                  position: 'relative',
                }}
                transparent>
                __
              </Text>
            </View>

            <Text
              style={{
                fontWeight: '800',
                fontSize: 24,
                width: '100%',
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: '3%',
              }}>
              Enter 4 Digit Code
            </Text>

            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                width: 300,
                fontFamily: 'louis george cafe',
                color: 'lightgrgraay',
                marginTop: '1%',
              }}>
              Enter 4 digit code that you received on your email.
            </Text>
            <View
              style={{
                flex: 0.6,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <TextInput
                style={{
                  backgroundColor: '#ffff',
                  fontWeight: '600',
                  alignSelf: 'center',
                  padding: 10,
                  fontSize: 26,
                  width: '18%',
                  height: '60%',
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderWidth: 2,
                  borderColor: 'lightgreen',
                  textAlign: 'center',
                }}
                placeholder="5"
                placeholderTextColor={'black'}></TextInput>

              <TextInput
                style={{
                  backgroundColor: '#ffff',
                  fontWeight: '600',
                  alignSelf: 'center',
                  padding: 10,
                  fontSize: 26,
                  width: '18%',
                  height: '60%',
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderWidth: 1.5,
                  borderColor: 'lightgray',
                }}></TextInput>

              <TextInput
                style={{
                  backgroundColor: '#ffff',
                  fontWeight: '600',
                  alignSelf: 'center',
                  padding: 10,
                  fontSize: 26,
                  width: '18%',
                  height: '60%',
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderWidth: 1.5,
                  borderColor: 'lightgray',
                }}></TextInput>

              <TextInput
                style={{
                  backgroundColor: '#ffff',
                  fontWeight: '600',
                  alignSelf: 'center',
                  padding: 10,
                  fontSize: 26,
                  width: '18%',
                  height: '60%',
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderWidth: 1.5,
                  borderColor: 'lightgray',
                }}></TextInput>
            </View>

            <TouchableOpacity
              onPress={() => {
                setotp(false);
                setforgetPassword(false);
                setresetPassword(true);
                setpasswordChanged(false);
                setvisible(true);
              }}
              style={{
                position: 'relative',
                backgroundColor: '#ed3760',
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center',
                height: '15%',
                marginTop: '3%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'louis george café',
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {resetPassword === true ? (
          <View
            style={{
              width: '100%',
              height: isKeyboardVisible ? '100%' : '60%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              elevation: 20,
            }}>
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: '-7%',
              }}>
              <Text
                onPress={() => {
                  setvisible(false);
                }}
                style={{
                  color: 'lightgray',
                  fontSize: 30,
                  fontWeight: '900',
                  position: 'relative',
                }}
                transparent>
                __
              </Text>
            </View>

            <Text
              style={{
                fontWeight: '800',
                fontSize: 24,
                width: '100%',
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: '3%',
              }}>
              Reset Password
            </Text>

            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                width: 300,
                fontFamily: 'louis george cafe',
                color: 'lightgrgraay',
                marginTop: '1%',
              }}>
              Set the new password for your account so you can login and access
              all the features.
            </Text>

            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                width: 300,
                fontFamily: 'louis george cafe',
                color: '',
                marginTop: '3%',
              }}>
              Password:
            </Text>

            <View
              style={{
                marginTop: '3%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: inputBackgroundPassword,
                height: '12%',
                borderRadius: 15,
                margin: 0,
                borderWidth: 1,
              }}>
              <Feather
                style={{marginLeft: 10}}
                color={inputBackgroundPassword}
                name="unlock"
                size={18}
              />

              <TextInput
                onFocus={() => setinputBackgroundPassword('#c62358')}
                onBlur={() => setinputBackgroundPassword('gray')}
                placeholderTextColor={inputBackgroundPassword}
                secureTextEntry = {true}
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                  color: '#c62358',
                  borderRadius: 5,
                  padding: 5,
                  margin: 2,
                  tintColor: '#c62358',
                }}
                placeholder="********"
                underlineColorAndroid="transparent"
                onChangeText={password =>
                  textInputChange('resetpassword', password)
                }
              />

              <Text style={styles.errorMsg}> {passwordError} </Text>
            </View>

            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                width: '100%',
                fontFamily: 'louis george cafe',
                color: '',
                marginTop: '3%',
              }}>
              Re-Enter Password:
            </Text>

            <View
              style={{
                marginTop: '3%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: setinputBackgroundPasswordCn,
                height: '12%',
                borderRadius: 15,
                borderWidth: 1,
              }}>
              <Feather
                style={{marginLeft: 10}}
                color={inputBackgroundPassword}
                name="unlock"
                size={18}
              />

              <TextInput
                onFocus={() => setinputBackgroundPasswordCn('#c62358')}
                onBlur={() => setinputBackgroundPasswordCn('gray')}
                placeholderTextColor={inputBackgroundPassword}
                secureTextEntry = {true}
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                  color: '#c62358',
                  borderRadius: 5,
                  padding: 5,
                  tintColor: '#c62358',
                }}
                placeholder="********"
                underlineColorAndroid="transparent"
                onChangeText={password =>
                  textInputChange('resetpassword', password)
                }
              />

              <Text style={styles.errorMsg}> {passwordError} </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setotp(false);
                setforgetPassword(false);
                setresetPassword(false);
                setpasswordChanged(true);
                setvisible(true);
              }}
              style={{
                position: 'relative',
                backgroundColor: '#ed3760',
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center',
                height: '15%',
                marginTop: '5%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'louis george café',
                  fontWeight: 'bold',
                }}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {passwordChanged === true ? (
          <View
            style={{
              width: '100%',
              height: isKeyboardVisible ? '100%' : '50%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
              elevation: 20,
              flex: 1,
            }}>
            <View
              style={{
                marginTop: '10%',
                height: '20%',
                width: '20%',
                backgroundColor: '#2ecc71',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                alignSelf: 'center',
              }}>
              <MaterialIcons color={'#fff'} name="done" size={50} />
            </View>

            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: '800',
                fontSize: 24,
                width: '100%',
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: '1%',
              }}>
              Password Changed!
            </Text>

            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: 16,
                width: 300,
                fontFamily: 'louis george cafe',
                color: 'lightgrgraay',
                margin: '1%',
              }}>
              Your password has been changed Successfully.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setvisible(false);
              }}
              style={{
                position: 'relative',
                backgroundColor: '#ed3760',
                justifyContent: 'center',
                borderRadius: 20,
                alignItems: 'center',
                height: '15%',
                marginTop: '5%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'louis george café',
                  fontWeight: 'bold',
                }}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ModalPopup>
    </SafeAreaView>
  );
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

  emailPassword: {
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
  },
  body: {
    flex: 2,
  },
});

// export default LogIn;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(LoginScreen);
