import React from "react";
import { View, StyleSheet, ImageBackground, Text, ActivityIndicator, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { detailProperty } from "../API/YmobilierApi";
import { useState, useEffect } from "react";



const PropertyDetail = ({navigation, route}) => {
    const favorite = false;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const itemId  = route.params.id;
    const [favoriteItem, setFavoriteItem] = useState(false);

    const handleFavoriteItemClicked = () => {
        // setFavoriteItem(!favoriteItem);
        console.log('ok');
      };

    const getPropertyDetail = (itemId) => {
        detailProperty(itemId).then(res => {
            setData(res);
            // console.log(data);
        }).catch(err => {
            console.log('error log property ' + err);
        }).finally(() => {
            console.log('page property detail loaded');
            setLoading(false);
        });
    }

    useEffect(() => {
        getPropertyDetail(itemId);
      }, []);



    
    



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {isLoading ? <ActivityIndicator/> :
            <ScrollView>
                <View style={style.backgroundImageContainer}>
                    <ImageBackground style={style.backgrounImage} source={{uri : data.main_image }}>
                                <Pressable
                                    onPress={() => handleFavoriteItemClicked}
                                    style={style.header}
                                    >
                                    <Ionicons
                                        name={favoriteItem ? "heart" : "heart-outline"}
                                        size={24}
                                        color={favoriteItem ? "#FF5A5F" : "white"}
                                    />
                                    
                                </Pressable>
                    </ImageBackground>
                    <View style={style.typeProp}>
                        <Text>{data.type.name}</Text> 
                    </View>
                </View>
                <View style={style.detailsContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.price}</Text>
                    </View>
                </View>
            </ScrollView>
    }
        </View>
    );
};

const style = StyleSheet.create({
    backgroundImageContainer: {
        elevation: 20,
        marginHorizontal: 20,
        marginTop: 20,
        height: 350,
        alignItems: 'center',
    },
    backgrounImage: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    headerBtn: {
        position: "absolute",
        top: 10,
        right: 40,
        zIndex: 10,
        padding: 10,
    },
    typeProp: {
        top: -20,
        width: 150,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 40,
    }




    


});

export default PropertyDetail;
