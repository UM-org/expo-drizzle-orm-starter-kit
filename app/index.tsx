import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import React from 'react';
import OpenSettingsModal from '../components/settings/OpenSettingsModal';
import { FontAwesome } from '@expo/vector-icons';

export default function IntroScreen() {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Intro</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={[{ position: "absolute", zIndex: 10, right: 10, bottom: 10 }]}>
                <TouchableOpacity onPress={() => setIsSettingsModalOpen(!isSettingsModalOpen)} style={styles.btn}>
                    <FontAwesome name="cogs" size={28} style={{ margin: 2 }} color="black" />
                </TouchableOpacity>
            </View>
            {isSettingsModalOpen && <OpenSettingsModal isVisible={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />}
        </View>
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
        padding: 10,
        borderRadius: 10,
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
