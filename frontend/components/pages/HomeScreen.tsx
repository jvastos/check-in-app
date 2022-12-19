import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const username: string = userStateStore((state) => state.username);
  const userId: string = userStateStore((state) => state.userId);
  const checkInStatus: boolean = userStateStore((state) => state.isCheckedIn);
  const setIsCheckedIn = userStateStore((state) => state.setIsCheckedIn);
  const userIsLoggedIn: boolean = userStateStore((state) => state.userIsLoggedIn);
  const setUserIsLoggedIn = userStateStore((state) => state.setUserIsLoggedIn);

  const updateUserCheckInStatus = async (checkInStatus: boolean) => {
    try {
      await fetch(`${process.env.API_URL}/${userId}/${checkInStatus}`, {
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

  useEffect(() => {
    !userIsLoggedIn && navigation.navigate('Login');
  }, [userIsLoggedIn]);

  return (
    <View style={screenStyles.container}>
      <h2>Hey {username} </h2>
      <Text>Your status: {checkInStatus === true ? 'Checked in' : 'Checked out'}</Text>
      <View style={screenStyles.button}>
        <Button
          title={checkInStatus === true ? 'Check out' : 'Check in'}
          onPress={setIsCheckedIn}
        />
      </View>
      <View style={screenStyles.button}>
        <Button
          title='Check The Wall'
          onPress={() => {
            navigation.navigate('List');
          }}
        />
      </View>
      <View style={screenStyles.button}>
        <Button
          title='Logout'
          onPress={() => {
            setUserIsLoggedIn(false);
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
