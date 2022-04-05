import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native-web";
import Home from "../components/HomeScreen";
import Favorite from "../components/FavoriteScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Favorites" component={Favorite} />
        </Stack.Navigator>
    )
}

function FavoriteStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorites" component={Favorite} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export default function YmobilierTab(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={
                    {tabBarActiveBackgroundColor: '#DDDDDD', 
                        tabBarInactiveBackgroundColor: '#FFFFFF',
                    }
                }
            >
                <Tab.Screen 
                    name="HomeTabScreen" 
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        headerShown: false,
                    }}
                />
                <Tab.Screen 
                name="FavoritesTabScreen" 
                component={FavoriteStack}
                options={{
                    tabBarLabel: 'Favorites',
                    headerShown: false,
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
        icon: {
          width: 30,
          height: 30
        }
})





