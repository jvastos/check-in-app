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
  const setIsCheckedIn = UseCheckInState((state) => state.setIsCheckedIn);

  const userId = '638df42e6ae18e0e039a2aa0';

  const updateUserCheckInStatus = async (checkInStatus: boolean) => {
    checkInStatus === false ? setIsCheckedIn(true) : setIsCheckedIn(false);
    try {
      //TODO: Fix the inverted logic in the line below. Why when I send the state to the DB I'm always one step behind?
      await fetch(`http://localhost:5000/${userId}/${!checkInStatus}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Your status: {checkInStatus === true ? 'Checked in' : 'Checked out'}</Text>
      <Button
        title={checkInStatus === true ? 'Check out' : 'Check in'}
        onPress={() => {
          updateUserCheckInStatus(checkInStatus);
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
