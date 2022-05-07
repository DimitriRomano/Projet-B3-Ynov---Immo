import { View, Image, FlatList, ActivityIndicator } from "react-native";
import Card from "./Card";
import { getProperties } from "../API/YmobilierApi";
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useStore } from "../store/zustandStore";



export default function ListProperties() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const  [bearer, setBearer] = useStore((state) =>[ state.bearer, state.setBearer]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  const getListProperties =  () => {
    getProperties(bearer).then(res => {
      setData(res);
      //console.log(res);
    }).catch(err => {
      console.log('test error' + err);
    }).finally(() => {
      setLoading(false);
    });
  }


  useEffect(() => {
    getListProperties();
  }, [bearer, isFocused]);


  return (
    <View>
      {isLoading ? <ActivityIndicator/> :
      <FlatList
        data={data}
        keyExtractor={(item,index) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            id={item.id}
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
    </View>
  );
}