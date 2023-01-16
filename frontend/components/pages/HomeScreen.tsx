import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';
import { API_URL } from '@env';
import { useFonts, Dokdo_400Regular } from '@expo-google-fonts/dokdo';
import { ViaodaLibre_400Regular } from '@expo-google-fonts/viaoda-libre';
import colors from '../colors';

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.babyBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontWeight: '900',
    fontSize: 30,
    fontFamily: 'Dokdo_400Regular',
    color: colors.white,
  },
  statusTxt: {
    fontWeight: '900',
    fontSize: 16,
    fontFamily: 'ViaodaLibre_400Regular',
    color: colors.acidGreen,
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

  let [fontsLoaded] = useFonts({
    Dokdo_400Regular,
    ViaodaLibre_400Regular,
  });

  const updateUserCheckInStatus = async (checkInStatus: boolean) => {
    try {
      await fetch(`${API_URL}${userId}/${checkInStatus}`, {
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
      <Text style={screenStyles.greeting}>Hey {username} </Text>
      <Text style={screenStyles.statusTxt}>
        Your status: {checkInStatus === true ? 'Checked in' : 'Checked out'}
      </Text>
      <View style={screenStyles.button}>
        <Button
          color={colors.pink}
          title={checkInStatus === true ? 'Check out' : 'Check in'}
          onPress={setIsCheckedIn}
        />
      </View>
      <View style={screenStyles.button}>
        <Button
          color={colors.pink}
          title='Check The Wall'
          onPress={() => {
            navigation.navigate('List');
          }}
        />
      </View>
      <View style={screenStyles.button}>
        <Button
          color={colors.pink}
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
