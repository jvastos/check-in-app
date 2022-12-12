import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

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

const LoginScreen = () => {
  return (
    <View style={pageStyles.container}>
      <Text>Username</Text>
      <TextInput
        style={pageStyles.input}
        clearButtonMode='always'
        placeholder='ex. dope_gecko23'
        placeholderTextColor={'grey'}
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
