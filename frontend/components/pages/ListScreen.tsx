import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';
import { API_URL } from '@env';
import { useFonts, Dokdo_400Regular } from '@expo-google-fonts/Dokdo';
import { ViaodaLibre_400Regular } from '@expo-google-fonts/viaoda-libre';

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    padding: 20,
    textAlign: 'center',
  },
  headline: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'Dokdo_400Regular',
    color: 'white',
  },
  name: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: 'ViaodaLibre_400Regular',
    color: '#9ACD32',
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

  let [fontsLoaded] = useFonts({
    Dokdo_400Regular,
    ViaodaLibre_400Regular,
  });

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
      <View style={screenStyles.wrapper}>
        <Text style={screenStyles.headline}>Who is in the wall right now:</Text>
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
    </View>
  );
};

export default ListScreen;
