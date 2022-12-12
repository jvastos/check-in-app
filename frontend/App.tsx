import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/pages/HomeScreen';
import ListScreen from './components/pages/ListScreen';
import LoginScreen from './components/pages/LoginScreen';

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
        <RootStack.Screen
          name='Login'
          component={LoginScreen}
        ></RootStack.Screen>
        <RootStack.Screen
          name='Home'
          component={HomeScreen}
        ></RootStack.Screen>
        <RootStack.Screen
          name='List'
          component={ListScreen}
        ></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
