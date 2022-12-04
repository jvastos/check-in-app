import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/pages/HomeScreen';
import ListScreen from './components/pages/ListScreen';

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name='List'
          component={ListScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
