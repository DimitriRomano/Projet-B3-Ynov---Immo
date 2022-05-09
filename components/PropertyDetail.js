import React from "react";
import { View, StyleSheet, ImageBackground, Text, ActivityIndicator, Pressable, Image, Dimensions, TouchableHighlight } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { detailProperty, toggleFavorite, postSendReservation } from "../API/YmobilierApi";
import { useState, useEffect } from "react";
import { useStore } from "../store/zustandStore";
import { ipHome } from "../API/YmobilierApi";


const { width } = Dimensions.get('window');

const PropertyDetail = ({navigation, route}) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const itemId  = route.params.id;
    const [favoriteItem, setFavoriteItem] = useState(route.params.isFavorite);
    const [bearer, setBearer] = useStore((state) =>[ state.bearer, state.setBearer]);
    

    const InteriorImage = ({image}) => {
        return <Image source={{uri : image.url}} style={style.interiorImage} />
    }

    const FeatureRender = ({item}) => {
        return( <View style={style.facility}>
            <Image source={{uri : ipHome+item.icon}} style={{ height: 20, width:20 }} />
            <Text style={style.facilityText}>{item.name}</Text>
            </View>
            )
    }

    const getFeatureType = (features,type) => {
        const result = features.filter(feature => feature.category_features_id === type)
        return result;
        }

    const AllFeatures = ({f,i})=>{
        const data = getFeatureType(f,i).map(item => <FeatureRender key={item.id} item={item} />);
        return (
            (data.length > 0) ?
            
            <View style={{ marginTop: 20, flexDirection:'column' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>{data[0].props.item.category_features.name}</Text>
                <View style={{ flexDirection: 'row', flexWrap:'wrap' }}>
                    {data}
                </View>
            </View>
            : null
            )     
     } 
        
    const handleFavoriteItemClicked = () => {
            toggleFavorite(data.id,bearer).then(
                setFavoriteItem(!favoriteItem)
            );
    };

    const getPropertyDetail = (itemId) => {
        detailProperty(itemId,bearer).then(res => {
            setData(res);
        }).catch(err => {
            console.log('error log property ' + err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const postReservation = (itemId) => {
        postSendReservation(bearer,itemId).then(res => {
            if(res.error){
                alert(res.error);
            }
        }).catch(err => {
            console.log('error log property ' + err);
        }).finally(() => {
            setLoading(false);
        }
        );
    }

    useEffect(() => {
        getPropertyDetail(itemId);
    }, [favoriteItem]);

    



    
    



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
                        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf:"stretch", width: 250, flexShrink: 1}}  >{data.title}</Text>
                        <View style= {{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={style.spaceTag}>
                                <Text style={{ color : "white" }}>{data.nb_rooms}</Text>
                            </View>
                                <Text style={{fontSize:13, marginLeft:5}}>{data.surface} m²</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize:16, color: 'grey' }}>{data.address}</Text>
                    {/* features @TODO à revoir pour api */}
                    {/* {
                        getFeatureType(data.features,3).length > 0 ?
                        <View style={{ marginTop: 20}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Calme et Situation</Text>
                            <FlatList
                            data={getFeatureType(data.features,3)}
                            renderItem={({item}) => <FeatureRender item={item} />
                            }
                            numColumns={2}
                            />
                        </View>
                        : null
                    } */}
                    <AllFeatures f={data.features} i={1}/>
                    <AllFeatures f={data.features} i={2}/>
                    <AllFeatures f={data.features} i={3}/>
                    <AllFeatures f={data.features} i={4}/>




                    {/* Description */}
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
                        onPress={() => postReservation(itemId)}
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
