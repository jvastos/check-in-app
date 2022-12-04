import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ListScreen = ({ navigation }: Props) => {
  return <div>ListScreen</div>;
};

export default ListScreen;
