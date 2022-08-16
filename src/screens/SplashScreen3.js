import React, {useEffect, useRef, useState} from 'react';
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
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';

function SplashScreen3({navigation}) {
  const toNextPage = () => {
    console.log('imgActive', imgActive);
    if (imgActive != 2) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get('window').width * screenIndex,
        animated: true,
      });

      setscreenIndex(screenIndex + 1);
    } else {
      setscreenIndex(1);
      navigation.navigate('Login');
    }
  };

  const scrollViewRef = useRef(null);
  const images = [
    {
      id: 1,
      img: require('../assets/images/splash/player1.png'),
      icon: require('../assets/images/splash/icon-sm-1.png'),
      heading: 'Welcome to Strike Zone',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      buttonText: 'Next',
    },

    {
      id: 2,
      img: require('../assets/images/splash/player2.png'),
      icon: require('../assets/images/splash/icon-sm-2.png'),
      heading: 'Access Block Content',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      buttonText: 'Next',
    },
    {
      id: 3,
      img: require('../assets/images/splash/player3.png'),
      icon: require('../assets/images/splash/icon-sm-3.png'),
      heading: '24 Hours Support Available',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      buttonText: "Let's Start",
    },
  ];

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  const translation = new Animated.ValueXY({x: 100, y: 0});

  const [imgActive, setimgActive] = useState(0);

  const [screenIndex, setscreenIndex] = useState(1);

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
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images.map((e, index) => (
            <View key={index}>
              <View style={{flex: 0.55}}>
                <View style={{flex: 1}}>
                  <Image key={index} style={styles.image} source={e.img} />
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flex: 0.45,
                }}>
                <Image
                  key={index}
                  style={{marginTop: 20, height: '20%', width: '26%'}}
                  resizeMode="stretch"
                  source={e.icon}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: '900',
                    fontSize: 22,
                    marginTop: 20,
                    width: 300,
                    color: '#141414',
                    fontFamily: 'titillium web',
                  }}>
                  {e.heading}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 12,
                    width: 300,
                    fontFamily: 'louis george cafe',
                    opacity: 0.699999988079071,
                    marginTop: 5,
                  }}>
                  {e.text}
                </Text>

                <View style={styles.wrapDot}>
                  {images.map((e, index) => (
                    <Text
                      style={
                        imgActive == index ? styles.dotActive : styles.dot
                      }>
                      ●
                    </Text>
                  ))}
                </View>

                <TouchableOpacity
                  onPress={toNextPage}
                  style={{
                    position: 'relative',
                    height: '12%',
                    backgroundColor: '#ed3760',
                    justifyContent: 'center',
                    width: '75%',
                    borderRadius: 15,
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: 'louis george café',
                      fontWeight: 'bold',
                    }}>
                    {e.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    maxHeight: Dimensions.get('window').height,
  },
  image: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor:'#C62358',
  },
  logo: {},
  wrapDot: {
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  dotActive: {
    margin: 3,
    color: '#ed3760',
    fontSize: 8,
  },
  dot: {
    margin: 3,
    color: '#fff',
    borderColor: '#ed3760',
    fontSize: 8,
  },
});

export default SplashScreen3;
