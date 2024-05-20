import React from "react";
import { Keyboard, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

interface TouchableScreenProps {
    children: JSX.Element | Array<JSX.Element>
    onPress: () => void
    style?: ViewStyle | Array<ViewStyle>
}

const TouchableScreen = (props: TouchableScreenProps) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress} style={{ flex: 1, ...props.style }} hitSlop={{ top: 100, left: 100, right: 100, bottom: 100 }}>
            {props.children}
        </TouchableWithoutFeedback>
    );
}
export default TouchableScreen;