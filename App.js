import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.mytext}>Open up App.js to start working on your françis</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212120',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mytext: {
    color: '#fff'
  }
});
