import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Alert } from 'react-native';
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

async function allUsersRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const username: string = userStateStore((state) => state.username);
  const setUserName = userStateStore((state) => state.setUserName);
  const setUserId = userStateStore((state) => state.setUserId);
  const password: string = userStateStore((state) => state.password);
  const setPassword = userStateStore((state) => state.setPassword);
  const usernameIsTaken: boolean = userStateStore((state) => state.usernameIsTaken);
  const setUsernameIsTaken = userStateStore((state) => state.setUsernameIsTaken);

  useEffect(() => {
    const checkUsernameAvailability = async (username: string) => {
      try {
        const allUsers = await allUsersRequest<User[]>('http://localhost:5000/allusers');
        const allUsernames = allUsers.map((i) => i.username);
        if (allUsernames.includes(username)) {
          setUsernameIsTaken(true);
        } else {
          setUsernameIsTaken(false);
        }
      } catch (error) {
        Alert.alert('Error', `${error}`, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        console.log('Somehting went wrong fetching the users from the DB.', error);
      }
    };
    checkUsernameAvailability(username);
  });

  const login = async (username: string, password: string) => {
    console.log('login', username, password);
  };

  const signup = async (username: string, password: string) => {
    const userInfo = {
      username: username,
      password: password,
    };
    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const { _id } = await res.json();
      setUserId(_id);
    } catch (error) {
      console.log('Something went wrong while trying to create a new user in the DB.', error);
    }
    navigation.navigate('Home');
  };

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
        autoComplete='username'
        autoCorrect={false}
        selectTextOnFocus={true}
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
        autoCorrect={false}
        secureTextEntry={true}
        maxLength={12}
        selectTextOnFocus={true}
        value={password}
        onChange={(event) => {
          setPassword(event.nativeEvent.text);
        }}
      />
      <Button
        title={usernameIsTaken ? 'Login' : 'Signup'}
        onPress={
          usernameIsTaken
            ? () => {
                login(username, password);
              }
            : () => {
                signup(username, password);
              }
        }
      />
    </View>
  );
};

export default LoginScreen;
