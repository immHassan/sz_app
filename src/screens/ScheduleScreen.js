import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
          Hello John Doe
        </Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <ImageBackground
            source={require('../assets/images/user-profile.jpg')}
            style={{width: 35, height: 35}}
            imageStyle={{borderRadius: 25}}
          />
        </TouchableOpacity>
      </View>

      {/* <CalendarList
         markingType={'period'}
         markedDates={{
           '2022-07-16': {
             selected: true,
             marked: true,
             color: 'red',
           },
           '2022-07-17': {startingDay: true, color: '#0770dffa'},
           '2022-07-18': {
             selected: true,
             endingDay: true,
             color: '#0770dffa',
           },
           '2022-07-19': {disabled: true, disableTouchEvent: true},
         }}
         // Callback which gets executed when visible months change in scroll view. Default = undefined
         onVisibleMonthsChange={months => {
           console.log('now these months are visible', months);
         }}
         // Max amount of months allowed to scroll to the past. Default = 50
         pastScrollRange={10}
         // Max amount of months allowed to scroll to the future. Default = 50
         futureScrollRange={10}
         // Enable or disable scrolling of calendar list
         scrollEnabled={true}
         calendarWidth={320}
         pagingEnabled={true}
         // Enable or disable vertical scroll indicator. Default = false
         showScrollIndicator={true}
         horizontal={true}
       /> */}
      <Agenda renderItem={renderItem} items={itemsData} />
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
});

export default ScheduleScreen;
