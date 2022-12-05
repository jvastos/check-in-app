import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: Props) => {
  return <Text>ListScreen</Text>;
};

export default ListScreen;
