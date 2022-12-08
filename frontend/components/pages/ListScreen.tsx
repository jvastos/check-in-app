import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { checkedInUsersState } from './zustandStore';

type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: Props) => {
  const checkedInUsers = checkedInUsersState((state) => state.checkedInUsers);
  const setCheckedInUsers = checkedInUsersState((state) => state.setCheckedInUsers);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers = await fetch('http://localhost:5000/allusers');
      const allUsersObj = await allUsers.json();
      setCheckedInUsers(
        await allUsersObj.map((i: any) => {
          if (i.isCheckedIn === true) {
            return `${i.firstName} ${i.lastName}`;
          }
        })
      );
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
