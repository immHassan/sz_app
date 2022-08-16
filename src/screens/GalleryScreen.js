import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';

const GalleryScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c62358',
          height: '100%',
          width: '100%',
        }}>
        <Text style={{color: '#fff', fontSize: 25, fontWeight: '700'}}>
          Gallery
        </Text>
      </View>

      <View
        style={{
          flex: 0.7,
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
            flex: 1,
          }}>
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: Dimensions.get('screen').width * 0.02,
              }}>
              <View
                style={{
                  width: 180,
                  height: 200,
                  aspectRatio: 1 * 0.7,
                }}>
                <Image
                  source={require('../assets/images/gallery1.png')}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>

              <View
                style={{
                  width: 180,
                  height: 200,
                  aspectRatio: 1 * 0.7,
                }}>
                <Image
                  source={require('../assets/images/gallery3.png')}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: Dimensions.get('screen').width * 0.02,
              }}>
              <View
                style={{
                  width: 180,
                  height: 200,
                  aspectRatio: 1 * 0.7,
                }}>
                <Image
                  source={require('../assets/images/gallery3.png')}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>

              <View
                style={{
                  width: 180,
                  height: 200,
                  aspectRatio: 1 * 0.7,
                }}>
                <Image
                  source={require('../assets/images/gallery3.png')}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default GalleryScreen;
