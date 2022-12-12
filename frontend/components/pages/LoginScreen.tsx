import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { userStateStore } from './zustandStore';

const pageStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
});

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  List: undefined;
};

interface User {
  username: string;
  password: string;
  isCheckedIn: boolean;
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const username: string = userStateStore((state) => state.username);
  const setUserName = userStateStore((state) => state.setUserName);
  const usernameIsTaken: boolean = userStateStore((state) => state.usernameIsTaken);
  const setUsernameIsTaken = userStateStore((state) => state.setUsernameIsTaken);

  useEffect(() => {
    const checkUsernameAvailability = async (username: string) => {
      const allUsers = await request<User[]>('http://localhost:5000/allusers');
      const allUsernames = allUsers.map((i) => i.username);
      if (allUsernames.includes(username)) {
        setUsernameIsTaken(true);
      } else {
        setUsernameIsTaken(false);
      }
    };
    checkUsernameAvailability(username);
  });

  return (
    <View style={pageStyles.container}>
      <Text>Username</Text>
      <TextInput
        style={pageStyles.input}
        clearButtonMode='always'
        placeholder='ex. dope_gecko23'
        placeholderTextColor={'grey'}
        onChange={(event) => {
          setUserName(event.nativeEvent.text);
        }}
        value={username}
      />
      {username !== '' && (
        <Text>
          {usernameIsTaken ? 'Username already in use.' : `That's a new username. Cool. `}
        </Text>
      )}
      <Text>Password</Text>
      <TextInput
        style={pageStyles.input}
        clearButtonMode='always'
        placeholder='ex. n!rv@na91'
        placeholderTextColor={'grey'}
      />
      <Button title={usernameIsTaken ? 'Login' : 'Signup'} />
    </View>
  );
};

export default LoginScreen;
