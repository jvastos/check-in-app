import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userStateStore } from './zustandStore';
import { useFonts, Dokdo_400Regular } from '@expo-google-fonts/dokdo';
import { ViaodaLibre_400Regular } from '@expo-google-fonts/viaoda-libre';
import { API_URL } from '../service/helpers';
import colors from '../service/colors';

const screenStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.babyBlue,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	greeting: {
		fontWeight: Platform.OS === 'android' ? undefined : '900',
		fontSize: 50,
		fontFamily: 'Dokdo_400Regular',
		color: colors.white,
	},
	statusTxt: {
		fontWeight: Platform.OS === 'android' ? undefined : '900',
		fontSize: 24,
		fontFamily: 'ViaodaLibre_400Regular',
		color: colors.acidGreen,
	},
	button: {
		marginVertical: 10,
		backgroundColor: colors.pink,
		paddingHorizontal: 10,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	buttonText: {
		fontFamily: 'Dokdo_400Regular',
		fontSize: 24,
		fontWeight: Platform.OS === 'android' ? undefined : '900',
		color: colors.white,
	},
});

type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface User {
	username: string;
	password: string;
	isCheckedIn: boolean;
}

const HomeScreen = ({ navigation }: Props) => {
	const username: string = userStateStore((state) => state.username);
	const userId: string = userStateStore((state) => state.userId);
	const isCheckedIn: boolean = userStateStore((state) => state.isCheckedIn);
	const toggleIsCheckedIn = userStateStore((state) => state.toggleIsCheckedIn);
	const userIsLoggedIn: boolean = userStateStore((state) => state.userIsLoggedIn);
	const setUserIsLoggedIn = userStateStore((state) => state.setUserIsLoggedIn);
	const setCheckedInUsers = userStateStore((state) => state.setCheckedInUsers);

	const [fonstLoaded] = useFonts({
		Dokdo_400Regular,
		ViaodaLibre_400Regular,
	});

	const updateUserCheckInStatusOnDB = async (isCheckedIn: boolean) => {
		try {
			await fetch(`${API_URL}/${userId}/${isCheckedIn}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	};

	async function request<T>(url: string): Promise<T> {
		const response = await fetch(url);
		return await response.json();
	}

	useEffect(() => {
		const fetchAllUsers = async () => {
			await updateUserCheckInStatusOnDB(isCheckedIn);
			const DBallUsers = await request<User[]>(`${API_URL}/allusers`);
			const DBcheckedInUsers = DBallUsers.filter((i) => i.isCheckedIn === true).map((i) => `${i.username}`);

			setCheckedInUsers(DBcheckedInUsers);
		};
		fetchAllUsers();
	}, [isCheckedIn]);

	useEffect(() => {
		!userIsLoggedIn && navigation.navigate('Login');
	}, [userIsLoggedIn]);

	return (
		<View style={screenStyles.container}>
			<Text style={screenStyles.greeting}>Hey {username} </Text>
			<Text style={screenStyles.statusTxt}>Your status: {isCheckedIn === true ? 'Checked in' : 'Checked out'}</Text>
			<View style={screenStyles.button}>
				<TouchableOpacity
					style={screenStyles.button}
					onPress={() => {
						toggleIsCheckedIn();
					}}>
					<Text style={screenStyles.buttonText}>{isCheckedIn === true ? 'Check out' : 'Check in'}</Text>
				</TouchableOpacity>
			</View>
			<View style={screenStyles.button}>
				<TouchableOpacity
					style={screenStyles.button}
					onPress={() => {
						navigation.navigate('List');
					}}>
					<Text style={screenStyles.buttonText}>Check The Wall</Text>
				</TouchableOpacity>
			</View>
			<View style={screenStyles.button}>
				<TouchableOpacity
					style={screenStyles.button}
					onPress={() => {
						setUserIsLoggedIn(false);
					}}>
					<Text style={screenStyles.buttonText}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default HomeScreen;
