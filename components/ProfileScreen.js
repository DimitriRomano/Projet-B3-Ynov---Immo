import React, {useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, FlatList, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStore } from '../store/zustandStore';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { getUserUserReservations } from '../API/YmobilierApi';
import { ipHome } from '../API/YmobilierApi';
import { Ionicons } from "@expo/vector-icons";


const ProfileScreen = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [bearer, setBearer] = useStore((state) => [state.bearer, state.setBearer]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    

    const getUserProperties =  () => {
        getUserUserReservations(bearer).then(res => {
          setData(res);
        }).catch(err => {
          console.log('test error' + err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const getParsedDate = (strDate) =>{
        var strSplitDate = String(strDate).split(' ');
        var date = new Date(strSplitDate[0]);
        // alert(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
    
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date =  dd + "-" + mm + "-" + yyyy;
        return date.toString();
    }

    const getColorFromStatus = (status) => {
        switch (status) {
            case 'rejected':
                return 'red';
            case 'approved':
                return 'green';
            case 'pending':
                return 'yellow';
        }
    }

    const Reservation = ({ item }) => {
        return (
            <View style={[{ flexDirection: 'row', marginHorizontal: 20, justifyContent:'space-around', borderRadius: 30, shadowColor: "#000",
            }, styles.shadowProp]}>
                <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                    <Text style={styles.text}>Propriété no </Text>
                    <Text style={styles.text}>{item.property_id}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>{getParsedDate(item.created_at)}</Text>
                </View>
                <View>
                    <Text style={[styles.text, {
                        color: getColorFromStatus(item.status)
                    }]}>{item.status}</Text>
                </View>
            </View>
        )
    }

   
    
      useEffect(() => {
        getUserProperties();
      }, [bearer, isFocused]);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image size={80} source={{ uri: ipHome+data.image }} /> 
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {marginTop: 15, marginBottom:5}]}>{data.name}</Title>
                            <Caption style={styles.caption}>@{data.name}</Caption>
                    </View>
                    <Pressable
                            style={{ position: 'absolute', top: 15, right: 0 }}
                            onPress={() => { setBearer(undefined) }}
                            >
                            <Ionicons
                                name="ios-log-out" size={30} color="black"
                            />
                    </Pressable>
                </View>
            </View> 

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color={'#777'} size={20} />
                    <Text style={{ color:"#777", marginLeft:20 }}>France</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color={'#777'} size={20} />
                    <Text style={{ color:"#777", marginLeft:20 }}>{data.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color={'#777'} size={20} />
                    <Text style={{ color:"#777", marginLeft:20 }}>{data.email}</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {borderRightColor: '#ddd', borderRightWidth: 1}]}>
                    <Title>Nombres de messages</Title>
                    <Caption>0</Caption>
                </View>    
                <View style={styles.infoBox}>
                    <Title>Propositions</Title>
                    <Caption>0</Caption>
                </View>    
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color={'#777'} size={25} />
                        <Text style={styles.menuItemText}>Vos demandes :</Text>
                    </View>
                </TouchableRipple>
                    <View>
                        <FlatList
                            data={data.reservations}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                Reservation({ item })
                              )}
                        />
                    </View>
            </View>
            

        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});