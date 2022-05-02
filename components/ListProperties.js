import { View, Image, FlatList, ActivityIndicator } from "react-native";
import Card from "./Card";
import { getProperties } from "../API/YmobilierApi";
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../Store/zustandStore";



export default function ListProperties() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const  [bearer, setBearer] = useStore((state) =>[ state.bearer, state.setBearer]);
  const navigation = useNavigation();
  
  const getListProperties =  () => {
    getProperties(bearer).then(res => {
      setData(res);
    }).catch(err => {
      console.log('test error' + err);
    }).finally(() => {
      //console.log('test finally');
      setLoading(false);
    });
  }

  useEffect(() => {
    getListProperties();
    console.log(bearer);
    if(bearer){
      console.log('test bearer');
    }
  }, [bearer]);


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