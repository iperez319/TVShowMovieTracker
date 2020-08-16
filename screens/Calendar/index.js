import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default function CalendarMain() {
  console.log('BEFORE');
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" translucent={true} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput
            style={styles.searchBar}
            onFocus={() => console.log('GO TO SEARCH SCREEN FOR TV/MOVIE')}
          />
          <Text>Homes</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#201F33',
    margin: 15,
    height: 50,
    borderRadius: 10,
    padding: 15,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
