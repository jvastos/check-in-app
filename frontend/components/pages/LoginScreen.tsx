import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
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

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const username: string = userStateStore((state) => state.username);
  const setUserName = userStateStore((state) => state.setUserName);

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
      <Text>Password</Text>
      <TextInput
        style={pageStyles.input}
        clearButtonMode='always'
        placeholder='ex. n!rv@na91'
        placeholderTextColor={'grey'}
      />
    </View>
  );
};

export default LoginScreen;
