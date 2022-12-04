import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  return (
    <View style={styles.container}>
      <Text>Your status: {status ? status : 'No status available.'}</Text>
      <br />
      <Button title='Check In' />
      <Button title='Check Out' />
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
