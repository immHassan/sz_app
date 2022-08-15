import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  Animated,
  PanResponder,
} from 'react-native';

function SplashScreen2({navigation}) {
  const translation = new Animated.ValueXY({x: 100, y: 0});

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, c) => {
      console.log(e, c);
    },
  });

  const rotate = translation.x.interpolate({
    inputRange: [0, 1000],
    outputRange: ['0deg', '90deg'],
  });
  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {
    Animated.timing(translation, {
      toValue: {x: 0, y: 0},
      duration: 1000,
      delay: 50,
      bounciness: 20,
      speed: 1,
      useNativeDriver: true,
    }).start();

    setTimeout(function () {
      navigation.navigate('Splash3');
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash/bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={{alignItems: 'center', flex: 0.15}}></View>
        <Animated.View
          style={{
            transform: [
              {translateX: translation.x},
              {translateY: translation.y},
              {rotate: rotate},
            ],

            alignItems: 'center',
            flex: 0.85,
          }}>
          <Image
            style={styles.logo}
            source={require('../assets/images/splash/logo.png')}></Image>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: (870 * Dimensions.get('window').width) / 412, //362 is actual height of image
  },
  logo: {},
});

export default SplashScreen2;
