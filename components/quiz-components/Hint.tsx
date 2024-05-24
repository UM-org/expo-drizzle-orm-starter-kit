import React from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "@/components/Themed";
import Colors from "../../constants/Colors";

interface HintProps {
    data: string[]
}

const Hint = ({ data }: HintProps) => {
    return (
        <View style={styles.box}>
            {data.map((row, i) => (
                <Text key={i} style={{ ...styles.title, color: row.includes("NADHIF") ? Colors.light.red : Colors.light.primary }}>{row}</Text>
            ))}
        </View>
    );
}
export default Hint;

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
        marginHorizontal: 10,
        padding: "5%"
    },
    title: {
        fontSize: 24,
        fontFamily: "AbdoMasterHeavy",
        color: Colors.light.primary,
        textAlign: "center",
    },
});