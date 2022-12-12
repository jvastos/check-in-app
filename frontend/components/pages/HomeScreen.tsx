import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const checkInStatus: boolean = userStateStore((state) => state.isCheckedIn);
  const setIsCheckedIn = userStateStore((state) => state.setIsCheckedIn);

  const userId = '638df42e6ae18e0e039a2aa0';

  const updateUserCheckInStatus = async (checkInStatus: boolean) => {
    try {
      await fetch(`http://localhost:5000/${userId}/${checkInStatus}`, {
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

  useEffect(() => {
    updateUserCheckInStatus(checkInStatus);
  }, [checkInStatus]);

  return (
    <View style={styles.container}>
      <Text>Your status: {checkInStatus === true ? 'Checked in' : 'Checked out'}</Text>
      <Button
        title={checkInStatus === true ? 'Check out' : 'Check in'}
        onPress={setIsCheckedIn}
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
