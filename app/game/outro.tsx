import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';
import bg from '@/assets/images/outroscreen.png';
import { Link, router } from 'expo-router';
import TouchableScreen from '@/components/reusable/TouchableScreen';

export default function OutroScreen() {
  const onClickStart = React.useCallback(() => {
    router.push("/game/wheel/")
  }, [])

  return (
    <TouchableScreen onPress={onClickStart}>
      <ImageBackground style={{ flex: 1, bottom: 5 }} source={bg} />
    </TouchableScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
