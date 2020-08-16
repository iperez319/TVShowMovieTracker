import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 15,
    marginBottom: 15,
  },
});
