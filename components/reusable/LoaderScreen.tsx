import React from 'react';
import { ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import bg from '@/assets/images/bg3.png';

export default function LoaderScreen() {
    return (
        <ImageBackground source={bg} resizeMode={"stretch"} style={{ flex: 1, position: "relative", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={46} />
        </ImageBackground>
    );
}