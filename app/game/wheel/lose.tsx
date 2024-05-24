import { ImageBackground, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';
import bg from '@/assets/images/bg2.png';
import fibelek from '@/assets/images/fibalek.png';
import { GameContext } from '@/contexts/GameContext';
import Colors from '@/constants/Colors';
import TouchableScreen from '@/components/reusable/TouchableScreen';

export default function LoseScreen() {
  const { reset } = React.useContext(GameContext);

  const onClickExit = React.useCallback(async () => {
    await reset?.()
  }, [])

  return (
    <TouchableScreen onPress={onClickExit}>
      <ImageBackground style={{ flex: 1, bottom: 5, justifyContent: "center" }} source={bg} >
        <View style={{ flex: 0.3, alignItems: "center" }}>
          <Image source={fibelek} resizeMode='center' style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </View>
        <View style={styles.box}>
          <Text style={{ ...styles.title }}>دخلت معانا في</Text>
          <Text style={{ ...styles.title, color: Colors.light.red }}>Tirage au sort</Text>
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
    padding: "3%"
  },
  title: {
    fontSize: 46,
    fontFamily: "AbdoMasterHeavy",
    color: Colors.light.primary,
    textAlign: "center",
  },
});
