import React, {useState} from 'react';
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
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

function LoginScreen({navigation}) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

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

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem('@token', value);
    } catch (e) {
      // saving error
    }
  };

  const login = async () => {
    navigation.navigate('Register');
    return false;
    setEmailError('');
    setPasswordError('');
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
            Welcome
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
            Login to your existing account of Strike Zone.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 0.5,
              borderColor: '#c62358',
              height: 40,
              borderRadius: 15,
              margin: 10,
              borderWidth: 1,
            }}>
            <Feather
              style={{marginLeft: 10}}
              color={'#c62358'}
              name="user-plus"
              size={18}
            />
            <TextInput
              placeholderTextColor="#c62358"
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: 'bold',
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

            <Text style={styles.errorMsg}> {emailError}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderWidth: 0.5,
              borderColor: '#c62358',
              height: 40,
              borderRadius: 15,
              margin: 10,
              borderWidth: 1,
            }}>
            <Feather
              style={{marginLeft: 10}}
              color={'#c62358'}
              name="unlock"
              size={18}
            />
            <TextInput
              placeholderTextColor="#c62358"
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: '#fff',
                color: '#c62358',
                borderRadius: 5,
                padding: 5,
                margin: 2,
                borderColor: '#c62358',
                tintColor: '#c62358',
              }}
              placeholder="Password"
              underlineColorAndroid="transparent"
              onChangeText={password => textInputChange('password', password)}
            />

            <Text style={styles.errorMsg}> {passwordError} </Text>
          </View>

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
                fontWeight: 'bold',
                fontSize: 14,
                width: 300,
                fontFamily: 'louis george cafe',
                opacity: 0.699999988079071,
                color: '#303030',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setotp(true);
              setforgetPassword(false);
              setresetPassword(false);
              setpasswordChanged(false);
              setvisible(true);
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
              marginTop: 30,
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
              marginTop: 15,
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
              marginTop: 15,
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
              fontWeight: 'bold',
              fontSize: 16,
              width: 300,
              fontFamily: 'louis george cafe',
              opacity: 0.699999988079071,
              marginTop: 30,
              color: '#303030',
            }}>
            Don't have an account?
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{
                color: '#c62358',
                fontWeight: '800',
                textDecorationLine: 'underline',
              }}>
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
              height: '50%',
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
                top: -20,
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
                width: 300,
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: 5,
              }}>
              Forgot Password
            </Text>

            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                width: 300,
                fontFamily: 'louis george cafe',
                color: 'lightgrgraay',
                marginTop: 5,
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
                marginTop: 20,
              }}>
              Email:
            </Text>

            <TextInput
              placeholderTextColor="#c62358"
              pla
              style={{
                marginTop: 15,
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
                height: '12%',
                marginTop: 15,
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
              height: '50%',
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
                top: -20,
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
                width: 300,
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: 5,
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
                marginTop: 5,
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
                height: '12%',
                marginTop: 15,
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
              height: '60%',
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
                top: -20,
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
                width: 300,
                color: 'black',
                fontFamily: 'titillium web',
                marginTop: 5,
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
                marginTop: 5,
              }}>
              Set the new password for your account so you can login and access
              all the features.
            </Text>

            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                width: 300,
                fontFamily: 'louis george cafe',
                color: '',
                marginTop: 20,
              }}>
              Password:
            </Text>

            <TextInput
              placeholderTextColor="#c62358"
              pla
              style={{
                marginTop: 15,
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
              placeholder="********"
            />

            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                width: 300,
                fontFamily: 'louis george cafe',
                color: '',
                marginTop: 20,
              }}>
              Re-Enter Password:
            </Text>

            <TextInput
              placeholderTextColor="#c62358"
              pla
              style={{
                marginTop: 15,
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
              placeholder="********"
            />

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
                height: '12%',
                marginTop: 15,
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
              height: '50%',
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
                marginTop: 40,
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

            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                borderColor: 'red',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'row',
                }}></View>
              <View
                style={{
                  flex: 0.6,
                  flexDirection: 'column',
                  borderColor: 'red',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: '800',
                    fontSize: 24,
                    width: 300,
                    color: 'black',
                    fontFamily: 'titillium web',
                    marginTop: 5,
                  }}>
                  Password Changed!
                </Text>

                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    width: 300,
                    fontFamily: 'louis george cafe',
                    color: 'lightgrgraay',
                    marginTop: 5,
                  }}>
                  Your password has been changes Successfully.
                </Text>
              </View>

              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'row',
                }}></View>
            </View>

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
                height: '12%',
                marginTop: 15,
              }}>
              <Text
                onPress={() => {
                  setvisible(false);
                }}
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

export default LoginScreen;
