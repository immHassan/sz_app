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

function WelcomeScreen({navigation}) {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('Login');
    }, 2000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Image
          style={styles.canvasLogo}
          fadeDuration={500}
          source={require('../src/assets/logo.png')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  canvasLogo: {
    width: Dimensions.get('window').width,
    height: (455 * Dimensions.get('window').width) / 700, //362 is actual height of image
  },
});

export default WelcomeScreen;
