import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { getUser } from '../API/YmobilierApi';
import ListProperties from './ListProperties';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ipHome } from '../API/YmobilierApi';
import { useStore } from '../store/zustandStore';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [bearer, setBearer] = useStore((state) => [state.bearer, state.setBearer]);


  const getUserProperties =  () => {
    getUser(bearer).then(res => {
      if(res.message === "Unauthenticated."){
        setBearer(undefined);
      }else{
        setUser(res);
      }
      //console.log(res);
    }).catch(err => {
      console.log('test error' + err);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => { getUserProperties() }, [bearer]);
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator /> :
      <>
      <View style={styles.header}>
        <View>
           <Text style={{ color: 'grey' }}>France</Text> 
           <Text style={{ fontWeight: 'bold', fontSize: 20, width: 100 }}>{user.name}</Text> 
        </View> 
        <Image style={styles.profilImage} size={80} source={{ uri: ipHome+user.image }} />
      </View>
      
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="ios-search" size={20} color="grey" />
            <TextInput style={styles.searchInput} placeholder="Rechercher une propriété" />   
          </View>
          <View style={styles.sortBtn}>
            <Ionicons name="ios-options" size={25} color="black" />
          </View>
        </View>
      <ListProperties />
      <StatusBar hidden/>
      </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    marginBottom: 20,
    borderBottomColor: '#f2f2f2',
  },
  profilImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: '#dadada',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '80%',
  },
  sortBtn:{
    backgroundColor: '#a9a9a9',
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  }
});
