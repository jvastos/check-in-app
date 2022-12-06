import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UseCheckInState } from './zustandStore';

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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const checkInStatus: boolean = UseCheckInState((state) => state.isCheckedIn);
  const toggleCheckInFunction = UseCheckInState((state) => state.checkInToggle);

  const checkStatus = () => {
    switch (checkInStatus) {
      case true:
        return 'Checked in';
      case false:
        return 'Checked out';
      default:
        return 'No status available.';
    }
  };

  const checkInHandler = (checkInStatus: boolean) => {
    toggleCheckInFunction(checkInStatus);
  };

  return (
    <View style={styles.container}>
      <Text>Your status: {checkStatus()}</Text>
      <Button
        title={checkStatus() === 'Checked in' ? 'Checke out' : 'Check in'}
        onPress={() => {
          checkInHandler(checkInStatus);
        }}
      />
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
