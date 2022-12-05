import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/pages/HomeScreen';
import ListScreen from './components/pages/ListScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const users: User[] = [
  {
    id: 1,
    firstName: 'João',
    lastName: 'Almeida',
  },
  {
    id: 2,
    firstName: 'Janja',
    lastName: 'Garnbret',
  },
  {
    id: 3,
    firstName: 'Tommy',
    lastName: 'Caldwell',
  },
];

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
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
