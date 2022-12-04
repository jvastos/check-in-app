import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title='Check In' />
      <Button title='Check Out' />
      <Button
        title='Check The Wall'
        onPress={() => {
          navigation.navigate('List');
        }}
      />
    </View>
  );
};

export default HomeScreen;
