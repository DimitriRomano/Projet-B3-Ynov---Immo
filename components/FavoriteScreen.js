import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Favorite() {
  return (
    <View style={styles.container}>
      <Text style={styles.mytext}>Favorite screen</Text>
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
