import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

let status: boolean;

const checkStatus = () => {
  switch (status) {
    case true:
      return 'Checked in';
    case false:
      return 'Checked out';
    default:
      return 'No status available.';
  }
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Your status: {checkStatus()}</Text>
      <Button title={checkStatus() === 'Checked in' ? 'Checke out' : 'Check in'} />
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
