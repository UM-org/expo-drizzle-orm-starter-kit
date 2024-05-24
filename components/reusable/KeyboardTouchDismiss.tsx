import React from "react";
import { Keyboard, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View, ViewStyle } from "react-native";

interface KeyboardTouchDismissProps extends TouchableWithoutFeedbackProps {
    onPress?: () => void
    style?: ViewStyle | Array<ViewStyle>
}
const KeyboardTouchDismiss = (props: KeyboardTouchDismissProps) => {
    const { style, ...otherProps } = props;
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
        console.log("noww");

        if (!isOpen)
            return
        Keyboard.dismiss()
        props.onPress?.()
    }, [isOpen])
    return (
        <TouchableWithoutFeedback style={{ ...style }} onPress={onClickDismiss} accessible={false} hitSlop={{ top: 100, left: 100, right: 100, bottom: 100 }} {...otherProps} />
    );
}
export default KeyboardTouchDismiss;