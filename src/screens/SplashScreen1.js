import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

function SplashScreen1({navigation}) {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('Splash2');
    }, 1000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/splash/bg.png')}></Image>

      <Text>test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default SplashScreen1;
