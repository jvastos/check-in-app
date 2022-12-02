import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
    <View style={styles.container}>
      <Button title='Check In' />
      <Button title='Check Out' />
      <Button title='Check The Wall' />
    </View>
  );
};

export default App;
