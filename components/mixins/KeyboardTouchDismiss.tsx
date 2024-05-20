import React from "react";
import { Keyboard, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

interface KeyboardTouchDismissProps {
    children: JSX.Element | Array<JSX.Element>
    onPress?: () => void
    style?: ViewStyle | Array<ViewStyle>
}

const KeyboardTouchDismiss = (props: KeyboardTouchDismissProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        }
    }, [])
    const onClickDismiss = React.useCallback(async () => {
        if (!isOpen)
            return
        Keyboard.dismiss()
        props.onPress?.()
    }, [isOpen])
    return (
        <TouchableWithoutFeedback style={{ ...props.style }} onPress={onClickDismiss} accessible={false} hitSlop={{ top: 100, left: 100, right: 100, bottom: 100 }}>
            {props.children}
        </TouchableWithoutFeedback>
    );
}
export default KeyboardTouchDismiss;