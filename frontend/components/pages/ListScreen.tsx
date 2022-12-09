import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { checkedInUsersState } from './zustandStore';

type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isCheckedIn: boolean;
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

const ListScreen = ({ navigation }: Props) => {
  const checkedInUsers = checkedInUsersState((state) => state.checkedInUsers);
  const setCheckedInUsers = checkedInUsersState((state) => state.setCheckedInUsers);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers = await request<User[]>('http://localhost:5000/allusers');
      const newUsers = allUsers
        .filter((i) => i.isCheckedIn === true)
        .map((i) => `${i.firstName} ${i.lastName}`);

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
