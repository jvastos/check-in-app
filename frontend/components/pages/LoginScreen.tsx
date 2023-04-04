import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API_URL } from '@env';
import { userStateStore } from './zustandStore';
import { useFonts, Dokdo_400Regular } from '@expo-google-fonts/dokdo';
import { ViaodaLibre_400Regular } from '@expo-google-fonts/viaoda-libre';
import colors from '../colors';

const screenStyles = StyleSheet.create({
	background: {
		backgroundColor: colors.babyBlue,
	},
	container: {
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	wrapper: {
		maxWidth: 700,
		padding: 10,
	},
	logo: {
		fontFamily: 'Dokdo_400Regular',
		fontSize: 60,
		color: colors.pink,
		fontWeight: '700',
		textAlign: 'center',
	},
	inputLabel: {
		fontFamily: 'Dokdo_400Regular',
		fontSize: 34,
		color: colors.white,
		fontWeight: '700',
	},
	input: {
		height: 50,
		marginVertical: 10,
		borderWidth: 4,
		padding: 10,
		borderColor: colors.white,
		color: colors.white,
		fontSize: 22,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 35,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 20,
	},
	minorText: {
		fontSize: 18,
		fontWeight: '900',
		color: colors.acidGreen,
		marginVertical: 10,
		fontFamily: 'ViaodaLibre_400Regular',
	},
	button: {
		backgroundColor: colors.pink,
		textAlign: 'center',
		padding: 10,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	buttonText: {
		color: colors.white,
		fontFamily: 'Dokdo_400Regular',
		fontSize: 34,
	},

	termsText: {
		color: colors.floralWhite,
		fontFamily: 'Dokdo_400Regular',
		fontSize: 34,
		textAlign: 'justify',
	},

	copyText: {
		color: 'black',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 50,
		fontFamily: 'Dokdo_400Regular',
	},
});

type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	List: undefined;
};

interface User {
	username: string;
	password: string;
	isCheckedIn: boolean;
	_id: string;
}

async function allUsersRequest<T>(url: string): Promise<T> {
	const response = await fetch(url);
	return await response.json();
}

async function userLoginRequest<T>(url: string, username: string, password: string): Promise<T> {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});
	return await response.json();
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
	const setUserIsLoggedIn = userStateStore((state) => state.setUserIsLoggedIn);
	const username: string = userStateStore((state) => state.username);
	const setUserName = userStateStore((state) => state.setUserName);
	const setUserId = userStateStore((state) => state.setUserId);
	const password: string = userStateStore((state) => state.password);
	const setPassword = userStateStore((state) => state.setPassword);
	const usernameIsTaken: boolean = userStateStore((state) => state.usernameIsTaken);
	const setUsernameIsTaken = userStateStore((state) => state.setUsernameIsTaken);
	const usernameStatusMessage: string = userStateStore((state) => state.usernameStatusMessage);
	const setUsernameStatusMessage = userStateStore((state) => state.setUsernameStatusMessage);
	const passwordStatusMessage: string = userStateStore((state) => state.passwordStatusMessage);
	const setPasswordStatusMessage = userStateStore((state) => state.setPasswordStatusMessage);

	let [fontsLoaded] = useFonts({
		Dokdo_400Regular,
		ViaodaLibre_400Regular,
	});

	useEffect(() => {
		const checkUsernameAvailability = async (username: string) => {
			try {
				const allUsers = await allUsersRequest<User[]>(`${API_URL}allusers`);
				const allUsernames = allUsers.map((i) => i.username);
				if (allUsernames.includes(username)) {
					setUsernameIsTaken(true);
					setUsernameStatusMessage('Username is in use (Is that you? If yes, go on and log in.)');
				} else {
					setUsernameIsTaken(false);
					setUsernameStatusMessage('');
				}
			} catch (error) {
				Alert.alert('Error', `${error}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
				console.log('Somehting went wrong fetching the users from the DB.', error);
			}
		};
		checkUsernameAvailability(username);
	});

	const login = async (username: string, password: string) => {
		if (username !== '' && password !== '') {
			try {
				const user = await userLoginRequest<User>(`${API_URL}logInUser`, username, password);
				if (user.username === username) {
					setUserId(user._id);
					setUserIsLoggedIn(true);
					navigation.navigate('Home');
				}
			} catch (error) {
				Alert.alert('Error', `${error}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
				setPasswordStatusMessage('Please double-check your password and try again.');
				console.log('Somehting went wrong logging in the user.', error);
			}
		} else {
			setPasswordStatusMessage('Please double check your login credentials and try again.');
		}
	};

	const signup = async (username: string, password: string) => {
		const userInfo = {
			username: username,
			password: password,
		};
		if (username !== '' && password !== '') {
			try {
				const res = await fetch(`${API_URL}users`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userInfo),
				});
				const { _id } = await res.json();
				setUserId(_id);
				setUserIsLoggedIn(true);
				navigation.navigate('Home');
			} catch (error) {
				console.log('Something went wrong while trying to create a new user in the DB.', error);
			}
		} else {
			setPasswordStatusMessage('Please double check your login credentials and try again.');
		}
	};

	return (
		<ScrollView style={screenStyles.background}>
			<View style={screenStyles.container}>
				<View style={screenStyles.wrapper}>
					<Text style={screenStyles.logo}>GOAT Wall</Text>
					<Text style={screenStyles.inputLabel}>Username</Text>
					<TextInput
						style={screenStyles.input}
						multiline={false}
						clearButtonMode='always'
						placeholder='ex. dope_gecko23'
						onChange={(event) => {
							setUserName(event.nativeEvent.text);
						}}
						value={username}
						autoComplete='username'
						autoCorrect={false}
						selectTextOnFocus={true}
						autoCapitalize='none'
						placeholderTextColor={colors.white}
					/>
					<Text style={screenStyles.minorText}>{usernameStatusMessage}</Text>
					<Text style={screenStyles.inputLabel}>Password</Text>
					<TextInput
						style={screenStyles.input}
						multiline={false}
						clearButtonMode='always'
						placeholder='ex. n!rv@na91'
						autoCorrect={false}
						secureTextEntry={true}
						maxLength={12}
						selectTextOnFocus={true}
						value={password}
						onChange={(event) => {
							setPassword(event.nativeEvent.text);
						}}
						onFocus={() => {
							setPasswordStatusMessage('');
						}}
						placeholderTextColor={colors.white}
					/>
					<Text style={screenStyles.minorText}>{passwordStatusMessage}</Text>
					<TouchableOpacity
						style={screenStyles.button}
						onPress={
							usernameIsTaken
								? () => {
										login(username, password);
								  }
								: () => {
										signup(username, password);
								  }
						}>
						<Text style={screenStyles.buttonText}>{usernameIsTaken ? 'Login' : 'Signup'}</Text>
					</TouchableOpacity>
					<Text style={screenStyles.minorText}>If you haven't created a user before, go ahead and create one by typing in the fields above.</Text>
					<Text style={screenStyles.termsText}>
						No small letters. No shady agreements. No sensitive information being stored. Just create a username. BE CREATIVE. Don't be racist, sexist, homophobic, intolerant, offensive in
						any form. Enjoy the company of your peers.
					</Text>
					<Text style={screenStyles.copyText}>
						This is an experimental project by a newbie developer. For now it's not possible to colaborate in it. All rights reserved to João Almeida.
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default LoginScreen;
