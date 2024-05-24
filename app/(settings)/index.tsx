import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Slider from '@react-native-community/slider';
import React, { useMemo } from 'react';
import Colors from '@/constants/Colors';
import { SettingsContext } from '@/contexts/SettingsContext';
import { useDerivedValue } from 'react-native-reanimated';

export default function SettingsScreen() {
    const { settings, updateSetting, isSuperAdmin } = React.useContext(SettingsContext);
    const [value, setValue] = React.useState(0.8);

    React.useEffect(() => {
        if (settings?.winProbability) setValue(settings?.winProbability)
    }, [settings])

    const updateValue = React.useCallback((v: number) => {
        setValue(v)
        updateSetting?.("winProbability", v)
    }, [])

    const percentage = useMemo(() => {
        return Math.floor(value * 100)
    }, [value])

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Probabilité de gain</Text>
                <Text style={styles.title}>{percentage} %</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <Text style={{ ...styles.title, fontSize: 16 }}>Faible</Text>
                    <Slider
                        disabled={!isSuperAdmin}
                        style={{ width: 250, height: 40 }}
                        value={value}
                        onValueChange={updateValue}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={Colors.light.primary}
                        maximumTrackTintColor="#000000"
                        thumbTintColor={Colors.light.primary}
                    />
                    <Text style={{ ...styles.title, fontSize: 16 }}>Haute</Text>
                </View>
                {!isSuperAdmin && <Text style={{ ...styles.title, fontSize: 14, fontStyle: "italic", color: "grey" }}>Vous devrez avoir les privilèges nécessaires pour modifier cette valeur !</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
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
    box: {
        backgroundColor: "#f4f9f3",
        padding: 8,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: "center"
    },
});