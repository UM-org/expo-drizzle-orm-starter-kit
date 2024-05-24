import { ImageBackground, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';
import bg from '@/assets/images/bg2.png';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { GameContext } from '@/contexts/GameContext';
import Colors from '@/constants/Colors';
import felicitaion from '@/assets/images/felecitation.png';
import TouchableScreen from '@/components/reusable/TouchableScreen';

export default function WinScreen() {
  const { giftName } = useLocalSearchParams();

  const onClickExit = React.useCallback(() => {
    router.push("/game/wheel/lose")
  }, [])

  return (
    <TouchableScreen onPress={onClickExit}>
      <ImageBackground style={{ flex: 1, bottom: 5, alignItems: "center" }} source={bg} >
        <View style={{ flex: 0.6, marginTop: "3%" }}>
          <Image source={felicitaion} resizeMode='center' style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </View>
        <View style={{ flex: 1, }}>
          <Text style={{ ...styles.title }}>ربحت معانا</Text>
          <Text style={{ ...styles.title, fontSize: 40 }}>{giftName}</Text>
        </View>
      </ImageBackground>
    </TouchableScreen>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "rgba(255,255,255, 0.85)",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.62,
    elevation: 3,
    marginHorizontal: "20%",
    padding: "5%"
  },
  title: {
    fontSize: 62,
    fontFamily: "AbdoMasterHeavy",
    color: Colors.light.red,
    textAlign: "center",
  },
});
