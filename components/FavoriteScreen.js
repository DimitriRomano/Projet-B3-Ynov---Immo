import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useStore } from '../store/zustandStore';
import { getFavorites } from '../API/YmobilierApi';
import { ActivityIndicator } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Card from './Card';

export default function Favorite() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [bearer, setBearer] = useStore((state) => [state.bearer, state.setBearer]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const getFavoritesList = () => {
    getFavorites(bearer).then(res => {
      setData(res);
    }).catch(err => {
      console.log('test error' + err);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getFavoritesList();
  }, [bearer,isFocused]);

  return (
    <View style={styles.container}>
      {
        isLoading ? <ActivityIndicator /> :
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            id={item.id}
            containerStyle={{ backgroundColor: index % 2 == 0  ? "#f2f2f2" : "#FFFFFF" }}
            heading={item.title}
            images={item.images}
            subheading={item.price}
            stars={item.surface}
            favorite={item.is_favorite}
            onPress={() => 
              navigation.navigate("PropertyDetail", {
                id: item.id,
                isFavorite : data[index].is_favorite,
              })
            }
          />
        )}
      />
      }
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mytext: {
    color: 'black',
  }
});
