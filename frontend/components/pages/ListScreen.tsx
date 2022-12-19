import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';

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
      const allUsers = await request<User[]>(`${process.env.API_URL}/allusers`);
      const newUsers = allUsers.filter((i) => i.isCheckedIn === true).map((i) => `${i.username}`);

      setCheckedInUsers(newUsers);
    };
    fetchAllUsers();
  }, []);

  return (
    <View>
      {checkedInUsers[0] !== undefined ? (
        checkedInUsers.map((i) => <p key={Math.random()}>{i}</p>)
      ) : (
        <p>Sad. It seems like no one is on the wall right now.</p>
      )}
    </View>
  );
};

export default ListScreen;
