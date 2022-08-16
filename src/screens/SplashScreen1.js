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
      <Image style={{
    height:Dimensions.get('window').height* 1,
    width:Dimensions.get('window').width * 1}} source={require('../assets/images/splash/bg.png')}></Image>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SplashScreen1;
