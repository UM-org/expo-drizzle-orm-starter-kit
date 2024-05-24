import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link, router } from 'expo-router';
import React from 'react';
import OpenSettingsModal from '@/components/settings-components/OpenSettingsModal';
import { FontAwesome } from '@expo/vector-icons';
import bg from '@/assets/images/splash.png';
import TouchableScreen from '@/components/reusable/TouchableScreen';

export default function IntroScreen() {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);

    const onClickStart = React.useCallback(() => {
        router.push("/game/")
    }, [])

    return (
        <TouchableScreen onPress={onClickStart}>
            <ImageBackground style={{ flex: 1, bottom: 5 }} source={bg}>
                <View style={[{ position: "absolute", zIndex: 10, right: 10, top: 25, borderRadius: 8, backgroundColor: "transparent" }]}>
                    <TouchableOpacity onPress={() => setIsSettingsModalOpen(!isSettingsModalOpen)} style={styles.btn}>
                        <FontAwesome name="cogs" size={24} style={{ margin: 2 }} color="#fff" />
                    </TouchableOpacity>
                </View>
                {isSettingsModalOpen && <OpenSettingsModal isVisible={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />}
            </ImageBackground>
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
    btn: {
        padding: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 0.62,
        elevation: 2,
        // borderWidth: 1
    },
});
