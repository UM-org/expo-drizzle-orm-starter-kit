import React from "react";
import { Dimensions, StyleSheet, ScrollView, Image, View, ViewStyle, TouchableWithoutFeedback } from "react-native";
import { Text } from "@/components/Themed";
import Option from "./Option";
import Colors from "../../constants/Colors";
import Hint from "./Hint";
import fibelek from '@/assets/images/fibalek.png';
import Animated, { useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import TouchableScreen from "@/components/reusable/TouchableScreen";

interface QuestionProps {
    onClickNext: () => void;
    onSubmit: (q: string, r: string) => void;
    data: IQuestion;
    activeQuestion: number
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Question = ({ data, onClickNext, activeQuestion, onSubmit }: QuestionProps) => {
    const questionTransition = useSharedValue<number>(windowWidth * -1);
    const questionAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: questionTransition.value }],
    }), []);
    const hintTransition = useSharedValue<number>(windowHeight * -1);
    const hintAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: hintTransition.value }],
    }), []);

    const [showHint, setShowHint] = React.useState(false);

    const hintPopIn = () => {
        hintTransition.value = withSpring(0)
    };
    const questionPopIn = () => {
        questionTransition.value = withSpring(0)
    };

    React.useEffect(() => {
        if (activeQuestion == data.index) {
            questionPopIn()
        }
    }, [activeQuestion])

    const onSubmitRes = React.useCallback((r: string) => {
        onSubmit(data.question, r)
        hintPopIn()
        setShowHint(true)
    }, [])
    const onNext = React.useCallback(() => {
        onClickNext()
    }, [])

    if (showHint)
        return (
            <ScrollView style={{ flex: 1, paddingHorizontal: "15%", paddingVertical: "5%", display: activeQuestion == data.index ? "flex" : "none" }}>
                <TouchableScreen onPress={onNext}>
                    <Animated.View
                        key={data.index}
                        style={[
                            {
                                flex: 1
                            },
                            hintAnimatedStyles
                        ]}
                    >
                        <Hint data={data.hint} />
                    </Animated.View>
                </TouchableScreen>
            </ScrollView>
        );
    return (
        <View style={{ flex: 1, display: activeQuestion == data.index ? "flex" : "none" }}>
            <View style={{ flex: 0.3, alignItems: "center" }}>
                <Image source={fibelek} resizeMode='center' style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: "15%" }}>
                <Animated.View
                    key={data.index}
                    style={[
                        {
                            flex: 1
                        },
                        questionAnimatedStyles
                    ]}
                >
                    <View style={styles.box}>
                        <Text style={styles.title}>{data.question}</Text>
                    </View>
                    {data.options.map((op, i) => (
                        <Option key={i} data={op} onSubmit={onSubmitRes} />
                    ))}
                </Animated.View>
            </ScrollView>
        </View>
    );
}
export default Question;

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#f4f9f3",
        padding: 8,
        borderRadius: 8,
        marginVertical: 5,
    },
    title: {
        fontSize: 32,
        fontFamily: "AbdoMasterHeavy",
        color: Colors.light.red,
        textAlign: "center",
    },
});