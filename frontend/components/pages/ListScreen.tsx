import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
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
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	wrapper: {
		paddingHorizontal: 20,
		textAlign: 'center',
		paddingTop: 100,
		paddingBottom: 30,
	},
	headline: {
		fontSize: 40,
		fontWeight: Platform.OS === 'android' ? undefined : '900',
		fontFamily: 'Dokdo_400Regular',
		color: colors.white,
		textAlign: 'center',
	},
	name: {
		fontSize: 30,
		fontWeight: Platform.OS === 'android' ? undefined : '900',
		fontFamily: 'ViaodaLibre_400Regular',
		color: colors.acidGreen,
		textAlign: 'center',
		paddingVertical: 10,
	},
});

type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	List: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = ({ navigation }: Props) => {
	const checkedInUsers = userStateStore((state) => state.checkedInUsers);

	const [fonstLoaded] = useFonts({
		Dokdo_400Regular,
		ViaodaLibre_400Regular,
	});

	return (
		<View style={screenStyles.container}>
			<ScrollView style={screenStyles.wrapper}>
				<Text style={screenStyles.headline}>Who is in the wall right now:</Text>
				{checkedInUsers[0] !== undefined ? (
					checkedInUsers.map((i) => (
						<Text style={screenStyles.name} key={Math.random()}>
							{i}
						</Text>
					))
				) : (
					<Text style={screenStyles.name}>Sad. It seems like no one is on the wall right now.</Text>
				)}
			</ScrollView>
		</View>
	);
};

export default ListScreen;
