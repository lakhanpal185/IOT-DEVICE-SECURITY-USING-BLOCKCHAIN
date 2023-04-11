import { StyleSheet, Text, View,FlatList } from 'react-native';
import DataDesboard from './components/DataDesboard';

export default function App() {
  return (
    <View style={styles.container}>
      <DataDesboard ip={'192.168.39.177'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcfc',
   
  },
});
