import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';
import { API_URL } from '@env';

const screenStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    paddingVertical: 10,
  },
});

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

interface User {
  username: string;
  password: string;
  isCheckedIn: boolean;
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

const ListScreen = ({ navigation }: Props) => {
  const checkedInUsers = userStateStore((state) => state.checkedInUsers);
  const setCheckedInUsers = userStateStore((state) => state.setCheckedInUsers);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers = await request<User[]>(`${API_URL}allusers`);
      const newUsers = allUsers.filter((i) => i.isCheckedIn === true).map((i) => `${i.username}`);

      setCheckedInUsers(newUsers);
    };
    fetchAllUsers();
  }, []);

  return (
    <View style={screenStyles.container}>
      {checkedInUsers[0] !== undefined ? (
        checkedInUsers.map((i) => (
          <Text
            style={screenStyles.name}
            key={Math.random()}
          >
            {i}
          </Text>
        ))
      ) : (
        <Text style={screenStyles.name}>Sad. It seems like no one is on the wall right now.</Text>
      )}
    </View>
  );
};

export default ListScreen;
