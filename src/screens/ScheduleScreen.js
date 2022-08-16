import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const renderItem = item => {
  console.log(item);
  return (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>{item.cookies ? `🍪` : `😋`}</Text>
    </View>
  );
};

const itemsData = {
  '2022-07-22': [{name: 'item 1 - any js object'}],
  '2022-07-23': [{name: 'item 2 - any js object', height: 80}],
  '2022-07-24': [],
  '2022-07-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
};

const ScheduleScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#C62358'}}>
      <View style={{flex: 0.05, backgroundColor: '#E15E97'}}>
        <Text
          style={{
            textAlign: 'center',
            alignContent: 'center',
            margin: '1%',
            fontFamily: '',
            color: '#ffff',
            fontSize: 14,
          }}>
          <AntDesign name="warning" size={14} color={'#fa6881'} /> We're hiring!
          Check out Careers to learn more.
        </Text>
      </View>

      <View style={{flex: 0.05, textAlign: 'center', alignContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            alignContent: 'center',
            margin: '1%',
            color: '#ffff',
            fontSize: 14,
          }}>
          Upcomming Classes
        </Text>
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: Dimensions.get('window').width * 0.05,
            borderRadius: Dimensions.get('window').width * 0.08,
            borderColor: '#B20E44',
            borderWidth: Dimensions.get('window').width * 0.025,
          }}>
          <Calendar
            theme={{
              'stylesheet.day.basic': {
                base: {
                  height: Dimensions.get('window').height * 0.025,
                },
              },
              backgroundColor: '#B20E44',
              fontFamily: 'Titillium Web',
              calendarBackground: '#b20e44',
              textColor: '#fff',
              monthTextColor: '#fff',
              textMonthFontSize: Dimensions.get('window').height * 0.025,
              textMonthFontWeight: '800',
              textDayFontSize: Dimensions.get('window').height * 0.015,
              arrowColor: '#fff',
              dayTextColor: '#fff',
            }}
          />
        </View>

        <View
          style={{
            marginHorizontal: Dimensions.get('window').width * 0.05,
            marginTop: Dimensions.get('window').width * 0.025,
          }}>
          <Text style={{color: '#fff', fontWeight: '800',fontFamily: 'Louis George Café',}}>Other Services</Text>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: Dimensions.get('window').width * 0.1,
            marginTop: Dimensions.get('window').width * 0.025,
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              opacity: 0.2,
              height: Dimensions.get('window').height * 0.002,
              marginHorizontal: Dimensions.get('window').width * 0.01,
              marginVertical: Dimensions.get('window').height * 0.01,
            }}></View>

          <View
            style={{
              flex: 0.8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.box}>
              <View
                style={{
                  flex: 0.3,
                }}></View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 0.4,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Feather
                  name="monitor"
                  size={Dimensions.get('window').width * 0.1}
                  color={'#fff'}
                />
                <Text
                  style={{
                    fontSize: Dimensions.get('window').width * 0.026,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  Membership
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                }}></View>
            </View>

            <View style={styles.box}>
              <View
                style={{
                  flex: 0.3,
                }}></View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 0.4,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <MaterialCommunityIcons
                  name="account-cowboy-hat-outline"
                  size={Dimensions.get('window').width * 0.1}
                  color={'#fff'}
                />

                <Text
                  style={{
                    fontSize: Dimensions.get('window').width * 0.026,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  Classes
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                }}></View>
            </View>
          </View>

          {/* ////////////////// */}

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.box}>
              <View
                style={{
                  flex: 0.3,
                }}></View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 0.4,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Ionicons
                  name="md-reorder-four-sharp"
                  size={Dimensions.get('window').width * 0.1}
                  color={'#fff'}
                />
                <Text
                  style={{
                    fontSize: Dimensions.get('window').width * 0.026,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  Rental
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                }}></View>
            </View>

            <View style={styles.box}>
              <View
                style={{
                  flex: 0.3,
                }}></View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 0.4,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <FontAwesome5
                  name="file-invoice"
                  size={Dimensions.get('window').width * 0.1}
                  color={'#fff'}
                />
                <Text
                  style={{
                    fontSize: Dimensions.get('window').width * 0.026,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  Invoices
                </Text>
              </View>

              <View
                style={{
                  flex: 0.3,
                }}></View>
            </View>
          </View>

          {/* ////////////////// */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.12,
    marginHorizontal: Dimensions.get('window').width * 0.008,
    alignItems: 'center',
    backgroundColor: '#b10e43',
  },
});

export default ScheduleScreen;
