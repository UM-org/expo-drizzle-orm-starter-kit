import React, { useEffect } from "react";
import { Keyboard, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "@/components/Themed";
import Colors from "../../constants/Colors";

interface OptionProps {
    onSubmit: (r:string) => void;
    data: IOption
}

const Option = ({ data, onSubmit }: OptionProps) => {
    const [isSelected, setIsSelected] = React.useState(false);

    const onPress = React.useCallback(() => {
        setIsSelected(true)
    }, [])

    React.useEffect(() => {
        if (isSelected) {
            setTimeout(() => {
                onSubmit(data.content)
            }, 500);
        }
    }, [isSelected])
    return (
        <TouchableOpacity style={{ ...styles.box, backgroundColor: isSelected ? "rgba(0, 141, 58, 0.4)":  "#f4f9f3"}} onPress={onPress}>
            <Text style={styles.title}>{data.content}</Text>
        </TouchableOpacity>
    );
}
export default Option;

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#f4f9f3",
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
        marginHorizontal: 10
    },
    title: {
        fontSize: 28,
        fontFamily: "AbdoMasterHeavy",
        color: Colors.light.blue,
        textAlign: "center",
    },
});