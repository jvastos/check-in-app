import React from 'react';
import { Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/pages/HomeScreen';
import ListScreen from './components/pages/ListScreen';
import LoginScreen from './components/pages/LoginScreen';
import { useFonts, Dokdo_400Regular } from '@expo-google-fonts/dokdo';
import { ViaodaLibre_400Regular } from '@expo-google-fonts/viaoda-libre';

const RootStack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	List: undefined;
};

const App = () => {
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				<RootStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}></RootStack.Screen>
				<RootStack.Screen
					name='Home'
					component={HomeScreen}
					options={{
						headerTransparent: true,
						headerShadowVisible: false,
						headerBlurEffect: 'light',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							fontFamily: 'Dokdo_400Regular',
							fontSize: 30,
							fontWeight: Platform.OS === 'android' ? undefined : '700',
						},
					}}></RootStack.Screen>
				<RootStack.Screen
					name='List'
					component={ListScreen}
					options={{
						headerTransparent: true,
						headerShadowVisible: false,
						headerBlurEffect: 'light',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							fontFamily: 'Dokdo_400Regular',
							fontSize: 30,
							fontWeight: Platform.OS === 'android' ? undefined : '700',
						},
					}}></RootStack.Screen>
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default App;
