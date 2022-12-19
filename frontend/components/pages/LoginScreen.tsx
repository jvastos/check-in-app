import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Button, Alert, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API_URL } from '@env';
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
  minorText: {
    fontSize: 12,
    color: 'grey',
    marginVertical: 10,
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
  _id: string;
}

async function allUsersRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

async function userLoginRequest<T>(url: string, username: string, password: string): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  return await response.json();
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const setUserIsLoggedIn = userStateStore((state) => state.setUserIsLoggedIn);
  const username: string = userStateStore((state) => state.username);
  const setUserName = userStateStore((state) => state.setUserName);
  const setUserId = userStateStore((state) => state.setUserId);
  const password: string = userStateStore((state) => state.password);
  const setPassword = userStateStore((state) => state.setPassword);
  const usernameIsTaken: boolean = userStateStore((state) => state.usernameIsTaken);
  const setUsernameIsTaken = userStateStore((state) => state.setUsernameIsTaken);
  const usernameStatusMessage: string = userStateStore((state) => state.usernameStatusMessage);
  const setUsernameStatusMessage = userStateStore((state) => state.setUsernameStatusMessage);
  const passwordStatusMessage: string = userStateStore((state) => state.passwordStatusMessage);
  const setPasswordStatusMessage = userStateStore((state) => state.setPasswordStatusMessage);

  useEffect(() => {
    const checkUsernameAvailability = async (username: string) => {
      try {
        const allUsers = await allUsersRequest<User[]>(`${API_URL}allusers`);
        const allUsernames = allUsers.map((i) => i.username);
        if (allUsernames.includes(username)) {
          setUsernameIsTaken(true);
          setUsernameStatusMessage('Username is in use (Is that you? If yes, go on and log in.)');
        } else {
          setUsernameIsTaken(false);
          setUsernameStatusMessage('');
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
    if (username !== '' && password !== '') {
      try {
        const user = await userLoginRequest<User>(`${API_URL}logInUser`, username, password);
        if (user.username === username) {
          setUserId(user._id);
          setUserIsLoggedIn(true);
          navigation.navigate('Home');
        }
      } catch (error) {
        Alert.alert('Error', `${error}`, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        setPasswordStatusMessage('Please double-check your password and try again.');
        console.log('Somehting went wrong logging in the user.', error);
      }
    } else {
      setPasswordStatusMessage('Please double check your login credentials and try again.');
    }
  };

  const signup = async (username: string, password: string) => {
    const userInfo = {
      username: username,
      password: password,
    };
    if (username !== '' && password !== '') {
      try {
        const res = await fetch(`${API_URL}users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });
        const { _id } = await res.json();
        setUserId(_id);
        setUserIsLoggedIn(true);
        navigation.navigate('Home');
      } catch (error) {
        console.log('Something went wrong while trying to create a new user in the DB.', error);
      }
    } else {
      setPasswordStatusMessage('Please double check your login credentials and try again.');
    }
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
          setUserName(event.nativeEvent.text.toLowerCase());
        }}
        value={username}
        autoComplete='username'
        autoCorrect={false}
        selectTextOnFocus={true}
      />
      <Text style={pageStyles.minorText}>{usernameStatusMessage}</Text>
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
        onFocus={() => {
          setPasswordStatusMessage('');
        }}
      />
      <Text style={pageStyles.minorText}>{passwordStatusMessage}</Text>
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
      <Text style={pageStyles.minorText}>
        If you haven't created a user before, go ahead and create one by tiping in the fields above.
      </Text>
    </View>
  );
};

export default LoginScreen;
