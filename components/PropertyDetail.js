import React from "react";
import { View, StyleSheet, ImageBackground, Text, ActivityIndicator, Pressable, Image, Dimensions, TouchableHighlight } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { detailProperty } from "../API/YmobilierApi";
import { useState, useEffect } from "react";

const { width } = Dimensions.get('window');

const PropertyDetail = ({navigation, route}) => {
    let favorite = false;
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const itemId  = route.params.id;
    const [favoriteItem, setFavoriteItem] = useState(favorite);

    const InteriorImage = ({image}) => {
        return <Image source={{uri : image.url}} style={style.interiorImage} />
    }

    const handleFavoriteItemClicked = () => {
        setFavoriteItem(!favoriteItem);
        // console.log('ok');

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
                                    onPress={handleFavoriteItemClicked}
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
                    {/* Container infos générales */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf:"stretch", flexShrink: 1}}  >{data.title}</Text>
                        <View style= {{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={style.spaceTag}>
                                <Text style={{ color : "white" }}>{data.nb_rooms}</Text>
                            </View>
                                <Text style={{fontSize:13, marginLeft:5}}>{data.surface} m²</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize:16, color: 'grey' }}>{data.address}</Text>
                    {/* features @TODO à revoir pour api */}
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={style.facility}>
                            <Text style={style.facilityText}>2</Text>    
                        </View>
                        <View style={style.facility}>
                            <Text style={style.facilityText}>2</Text>    
                        </View>
                        <View style={style.facility}>
                            <Ionicons name="card-outline" size={18} color="grey" />
                            <Text style={style.facilityText}>100m area</Text>    
                        </View>
                    </View>
                    <Text style={{ marginTop: 20, color: 'grey' }}>{data.description}</Text>
                    <FlatList 
                        keyExtractor={(_, key)=> key.toString()}
                        data={data.images} 
                        horizontal showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => <InteriorImage image={item}/>}
                        contentContainerStyle={{ marginTop: 20 }}
                    />
                </View>
                <View style={style.footer}>
                    <View>
                        <Text style={{ color: "blue", fontWeight: 'bold' }} > {data.price}€ </Text>
                        <Text style={{ color: "grey", fontWeight: 'bold' }} > Total Price </Text>
                    </View>
                    <TouchableHighlight
                        onPress={() => console.log('Reservation ok')}
                        style={{ borderRadius: 10 }}
                    >
                        <View style={style.reservationBtn}>
                        <Text style={{ color: "white" }}>Proposer une offre</Text> 
                        </View>
                    </TouchableHighlight>
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
        backgroundColor: '#F5F5F5',
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
    },
    spaceTag: {
        height: 30,
        backgroundColor: "blue",
        paddingHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    facility: {
        flexDirection: 'row',
        marginRight: 15,
    },
    facilityText: {
        marginLeft: 5,
        color: 'grey',
    },
    interiorImage:{
        width: width / 3 - 20,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    footer: {
        height: 70,
        backgroundColor: '#F5F5F5',
        borderRadius : 10,
        paddingHorizontal: 20,
        margin: 10,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-between',   
    },
    reservationBtn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 10,

    },



    


});

export default PropertyDetail;
