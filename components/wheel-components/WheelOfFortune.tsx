import React from "react";
import { ImageBackground, Keyboard, ScrollView, StyleSheet, Image, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Animated, { Easing, Extrapolation, cancelAnimation, interpolate, runOnJS, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import useComponentSize from "@/hooks/useComponentSize";
import outerWheel from '@/assets/images/wheel/outer.png';
import innerWheel from '@/assets/images/wheel/inner.png';
import { SelectGift } from "../../db/schema";
import { GIFTS_MAP, NO_GIFT_MAP, SPIN_DURATION, WIN_PROBABILITY } from "./wheelConfig";
import useRandom from "@/hooks/useRandom";
import { SettingsContext } from "@/contexts/SettingsContext";

interface WheelOfFortuneProps {
    gifts: SelectGift[]
    isLoadingGifts: boolean
    handleWin: (g: SelectGift) => void
    handleLose: () => void
}

const WheelOfFortune = ({ gifts, isLoadingGifts, handleWin, handleLose }: WheelOfFortuneProps) => {
    const { settings } = React.useContext(SettingsContext);
    const { getRandomInt, pickRandomElement, pickRandomElementWithProbability } = useRandom();
    const { size, position, onLayout } = useComponentSize()
    const animatedRef = useAnimatedRef();
    const wheelRotation = useSharedValue<number>(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ rotate: `${wheelRotation.value} deg` }, { scale: 0.85 }],
    }), []);

    const animationConfig = React.useMemo(() => {
        const iterations = getRandomInt(3, 5);
        return {
            rotations: 360 * iterations,
            duration: SPIN_DURATION * iterations
        }
    }, [])

    const onFinish = React.useCallback((wheelResult: SelectGift | null) => {
        if (wheelResult) {
            handleWin(wheelResult)
        } else {
            handleLose()
        }
    }, [])

    const onStart = React.useCallback(async () => {
        const result = getWheelResult();
        const degree = getStopDegree(result)
        console.log("wheelResult", result);
        console.log("degree", degree);
        wheelRotation.value = withTiming(animationConfig.rotations + degree, { duration: animationConfig.duration, easing: Easing.inOut(Easing.back(1)) }, (finished) => {
            if (!finished)
                return
            runOnJS(onFinish)(result)
        })
    }, [animationConfig, settings, gifts])

    const getStopDegree = React.useCallback((wheelResult: SelectGift | null) => {
        let degree = pickRandomElement(NO_GIFT_MAP)
        if (wheelResult) {
            const gift = GIFTS_MAP.find((g) => wheelResult.name && g.keywords.some(v => wheelResult.name?.toLowerCase().includes(v)))
            if (gift)
                degree = pickRandomElement(gift.degrees)
        }
        return degree
    }, [animationConfig])

    const getWheelResult = React.useCallback(() => {
        const availableGifts = gifts?.filter(el => el?.actual_qty && el?.actual_qty > 0)
        console.log("availableGifts", availableGifts);
        return pickRandomElementWithProbability(availableGifts, settings?.winProbability || 0.8)
    }, [settings, gifts])

    return (
        <TouchableWithoutFeedback onPress={onStart} style={{ flex: 1 }} hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }} disabled={isLoadingGifts}>
            <ImageBackground source={outerWheel} resizeMode={"contain"} style={{ position: "relative", flex: 1, alignItems: "center", justifyContent: "center" }} onLayout={onLayout}>
                <Animated.View
                    ref={animatedRef}
                    style={[
                        styles.innerWheelWrapper,
                        animatedStyles
                    ]}>
                    <Image
                        style={[{ resizeMode: "contain", maxHeight: "100%", maxWidth: "100%", width: "90%", height: "100%", flex: 0.9 }]}
                        source={innerWheel}
                    />
                </Animated.View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}
export default WheelOfFortune;

const styles = StyleSheet.create({
    innerWheelWrapper: {
        zIndex: -1,
        flex: 1,
        marginTop: -40,
        width: "100%",
        // position: "absolute",
        alignItems: "center",
        justifyContent: "center",

    },
});