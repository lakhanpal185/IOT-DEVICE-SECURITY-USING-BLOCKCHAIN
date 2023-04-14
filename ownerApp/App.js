import { StyleSheet, Text, View,FlatList } from 'react-native';
import Navigation from './components/navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcfc',
   
  },
});
