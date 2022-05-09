import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Text,
    Dimensions,
    Pressable,
  } from "react-native";
  import { useState, useRef, useEffect } from "react";
  import { Ionicons } from "@expo/vector-icons";
import { addFavorite, getProperties, toggleFavorite } from "../API/YmobilierApi";
import { useStore } from "../store/zustandStore";
  const HEIGHT = 225;
  const WIDTH = Dimensions.get("window").width;
  
  export default function Card({
    id,
    main_image,
    images,
    heading,
    subheading,
    stars,
    favorite,
    onPress,
    style,
    ...rest
  }) {
    const flatListRef = useRef(null);
    const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };
    const [activeIndex, setActiveIndex] = useState(0);
    const [bearer, setBearer] = useStore((state) => [state.bearer, state.setBearer]);
    const onViewRef = useRef(({ changed }) => {
      if (changed[0].isViewable) {
        setActiveIndex(changed[0].index);
      }
    });
    const [favoriteItem, setFavoriteItem] = useState(favorite);
  
    const handleFavoriteItemClicked = () => {
        toggleFavorite(id,bearer).then(res => {
          setFavoriteItem(!favoriteItem);
        }).catch(err => {
          console.log('test error' + err);
        }
      );
    };

    return (
       
      <View style={[styles.cardContainer, style]} {...rest}>
        <Pressable
          onPress={handleFavoriteItemClicked}
          style={styles.favoriteContainer}
        >
          <Ionicons
            name={favoriteItem ? "heart" : "heart-outline"}
            size={24}
            color={favoriteItem ? "#FF5A5F" : "white"}
          />
        </Pressable>
        {/* Images */}
        <View>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ref={(ref) => (flatListRef.current = ref)}
            snapToAlignment="center"
            pagingEnabled
            viewabilityConfig={viewConfigRef}
            onViewableItemsChanged={onViewRef.current}
            renderItem={({ item }) => (
              <Pressable onPress={onPress} style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.url }} />
              </Pressable>
            )}
          />
        </View>
        {/*  Dot Container */}
        {images.length > 1 && (
          <View style={styles.dotContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  {
                    opacity: index === activeIndex ? 1 : 0.5,
                  },
                  styles.dot,
                ]}
              />
            ))}
          </View>
        )}
  
        {/* Text Container */}
        <Pressable onPress={onPress} style={styles.textContainer}>
          <View style={styles.starContainer}>
            <Ionicons name="star" size={16} color="#FF5A5F" />
            <Text style={styles.starText}>{stars} m²</Text>
          </View>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subheading}>{subheading}€</Text>
        </Pressable>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    cardContainer: {
      marginTop: 20,
      padding: 20,
      borderRadius: 20,
      elevation: 2,
      marginHorizontal: 20,
      backgroundColor: "white",
      with: WIDTH - 40,
    },
    favoriteContainer: {
      position: "absolute",
      top: 15,
      right: 20,
      zIndex: 10,
      padding: 10,
    },
    imageContainer: { width: WIDTH - 60 },
    image: {
      width: "100%",
      height: HEIGHT,
      borderRadius: 10,
      marginLeft: -2,
    },
    dotContainer: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      top: HEIGHT ,
      alignSelf: "center",
    },
    dot: {
      width: 5,
      height: 5,
      margin: 3,
      borderRadius: 30,
      backgroundColor: "white",
    },
    textContainer: { marginTop: 10 },
    starContainer: { flexDirection: "row" },
    starText: { marginLeft: 5 },
    heading: { fontSize: 20 },
    subheading: { fontSize: 18, marginTop: 5 },
  });







