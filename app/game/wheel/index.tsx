import React, { useState, useContext, useCallback, useRef, useMemo, useEffect } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, Alert, TouchableWithoutFeedback, TouchableOpacity, useWindowDimensions, ActivityIndicator } from "react-native";
import { GameContext } from "@/contexts/GameContext";
import { Ionicons } from '@expo/vector-icons';
import bg from '@/assets/images/bg3.png';
import useGifts from "@/hooks/useGifts";
import { SelectGift } from "@/db/schema";
import { router, useNavigation } from "expo-router";
import WheelOfFortune from "@/components/wheel-components/WheelOfFortune";

export default function WheelScreen() {
  const navigation = useNavigation();
  const { reset, player, updatePlayerData } = useContext(GameContext);
  const { fetchAllGifts, updateGift } = useGifts();
  const [gifts, setGifts] = useState<Array<SelectGift>>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchGifts = async () => {
    try {
      setIsLoading(true)
      const results = await fetchAllGifts();
      if (Array.isArray(results)) {
        setGifts(results)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }
  React.useEffect(() => {
    fetchGifts().then().catch(err => console.log(err))
  }, [])

  const onClickExit = useCallback(async () => {
    await reset?.()
  }, [])

  const handleWin = useCallback(async (gift: SelectGift) => {
    console.log("handleWin", gift?.name);
    await updatePlayerData?.({ gift: gift?.name });
    if (gift?.actual_qty)
      await updateGift(gift?.id, { actual_qty: gift?.actual_qty - 1 });
    setTimeout(() => {
      router.push({ pathname: "/game/wheel/win", params: { giftName: gift?.name } })
    }, 500);
  }, [player, gifts])

  const handleLose = useCallback(async () => {
    console.log("handleLose");
    setTimeout(() => {
      router.push("/game/wheel/lose")
    }, 500);
  }, [player])

  React.useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
      return;
    }), [navigation]);

  if (isLoading)
    return (
      <ImageBackground source={bg} resizeMode={"stretch"} style={{ flex: 1, position: "relative", width: "100%", alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={onClickExit} style={[styles.btn, { alignItems: "center", position: "absolute", right: 15, top: 25 }]}>
          <Ionicons name="exit" size={28} color={"#fff"} style={{ paddingLeft: 5 }} />
        </TouchableOpacity>
        <ActivityIndicator size={46} />
      </ImageBackground>
    );
  return (
    <ImageBackground source={bg} resizeMode={"stretch"} style={{ flex: 1, position: "relative", width: "100%" }}>
      <TouchableOpacity onPress={onClickExit} style={[styles.btn, { alignItems: "center", position: "absolute", right: 15, top: 25 }]}>
        <Ionicons name="exit" size={28} color={"#fff"} style={{ paddingLeft: 5 }} />
      </TouchableOpacity>
      <View style={{ flex: 0.8, zIndex: 100, justifyContent: "center", paddingTop: "5%" }}>
        <WheelOfFortune gifts={gifts} isLoadingGifts={isLoading} handleWin={handleWin} handleLose={handleLose} />
      </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    width: "70%",
    marginTop: -100,
    resizeMode: "center",
  },
  headerImg: {
    resizeMode: "center",
    height: "100%",
    maxHeight: "100%",
    width: "25%"
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10

  },
  tinyLogo: {
    flex: 1,
    resizeMode: "center",
    maxWidth: "15%",
    marginHorizontal: 10
  },
  tinyLogoRight: {
    flex: 1,
    resizeMode: "center",
    maxWidth: "35%",
    marginHorizontal: "8%"
  },
  btn: {
    padding: 5,
    borderRadius: 10,
    // elevation: 2,
    borderWidth: 0.5,
    borderColor: "#fff"
  },
})