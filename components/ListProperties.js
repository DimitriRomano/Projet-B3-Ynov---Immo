import { View, Image, FlatList, ActivityIndicator } from "react-native";
import Card from "./Card";
import { getProperties } from "../API/YmobilierApi";
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";



export default function ListProperties() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  const getListProperties =  () => {
    getProperties().then(res => {
      setData(res);
      //console.log(data);
    }).catch(err => {
      console.log('test error' + err);
    }).finally(() => {
      //console.log('test finally');
      setLoading(false);
    });
  }

  useEffect(() => {
    getListProperties();
  }, []);


  return (
    <View>
      {isLoading ? <ActivityIndicator/> :
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            containerStyle={{ backgroundColor: index % 2 == 0  ? "#f2f2f2" : "#FFFFFF" }}
            heading={item.title}
            images={item.images}
            subheading={item.price}
            stars={item.surface}
            favorite={1}
            onPress={() => 
              navigation.navigate("PropertyDetail", {
                id: item.id,
              })
            }
          />
        )}
      />
          }
    </View>
  );
}