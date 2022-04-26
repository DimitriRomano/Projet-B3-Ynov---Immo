import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListProperties from './ListProperties';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>  
      <ListProperties />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
