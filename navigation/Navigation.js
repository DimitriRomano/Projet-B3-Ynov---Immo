import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Button, TouchableHighlight, View, Text } from "react-native";
import Home from "../components/HomeScreen";
import Favorite from "../components/FavoriteScreen";
import LogIn from "../components/LogIn";
import Profile from "../components/ProfileScreen";
import PropertyDetail from "../components/PropertyDetail";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isAuthenticated } from "../store/zustandStore";
import { useState } from "react";
import { useStore } from "../store/zustandStore";
import { logOut } from "../API/YmobilierApi";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Favorites" component={Favorite} />
            <Stack.Screen name="PropertyDetail" component={PropertyDetail} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}



function FavoriteStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Favorites" component={Favorite} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

function LoginStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LogIn} />
        </Stack.Navigator>
    )
}

export default function YmobilierTab(){
    const [bearer, setBearer] = useStore((state) => [state.bearer, state.setBearer]);
    const authed = isAuthenticated();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={
                    {tabBarActiveBackgroundColor: '#DDDDDD', 
                        tabBarInactiveBackgroundColor: '#FFFFFF',
                    }
                }
            >
            {authed ? (
                <>
                <Tab.Screen 
                    name="HomeTabScreen" 
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        headerShown: false,
                        tabBarIcon: () => {
                            return <Ionicons name="ios-home" color={"black"} size={24} />
                        },
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen 
                name="FavoritesTabScreen" 
                component={FavoriteStack}
                options={{
                    tabBarLabel: 'Favorites',
                    headerShown: false,
                    tabBarIcon: () => {
                        return <Ionicons name="heart-outline" color={"black"} size={24} />
                    },
                    tabBarShowLabel: false,
                }}
                />
                <Tab.Screen
                name="ProfileTabScreen" 
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: () => {
                        return <Ionicons name="ios-person" color={"black"} size={24} />
                    },
                    tabBarShowLabel: false,
                }}
                />
                </>
            )
            : (
                <>
                <Tab.Screen
                        name="Loggin"
                        component={LoginStack}
                        options={
                            {
                                tabBarLabel: 'Loggin',
                                headerShown: false,
                                tabBarIcon: () => {
                                    return <Ionicons name="person-circle-outline" color={"black"} size={24} />
                                },
                                tabBarShowLabel: false,
                            }
                        }
                    /> 
                </>
            )
                }
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
        icon: {
          width: 30,
          height: 30
        },
        deconnect: {
            borderRadius: 10,
            padding: 10,
        },
})





