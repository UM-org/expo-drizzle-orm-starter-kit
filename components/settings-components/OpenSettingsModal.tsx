import React, { useCallback, useContext, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { View, Pressable, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { Button, InputGroup, PrimaryButton, TextInput } from '@/components/Themed';
import { SettingsContext } from '@/contexts/SettingsContext';

export type OpenSettingsModalProps = {
    onClose: () => void
    isVisible: boolean
}

const OpenSettingsModal: React.FC<OpenSettingsModalProps> = (props) => {
    const [code, setCode] = useState<string>("")
    const [isCodeValid, setIsCodeValid] = useState(false)
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const { setIsSuperAdmin, isSuperAdmin } = React.useContext(SettingsContext);

    const onSubmit = useCallback(() => {
        setIsSuperAdmin?.(code == process.env.EXPO_PUBLIC_SUPER_ADMIN_CODE)
        if (code != process.env.EXPO_PUBLIC_ADMIN_CODE && code != process.env.EXPO_PUBLIC_SUPER_ADMIN_CODE) {
            setIsCodeValid(false)
        } else {
            props?.onClose()
            router.push("/(settings)/");
        }
    }, [code])

    React.useEffect(() => {
        setIsCodeValid(true)
    }, [code])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}
            style={{ borderRadius: 5 }}
        >
            <View style={[style.centeredView]}>
                <View style={style.modalView}>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => props.onClose?.()}>
                        <AntDesign name="close" size={24} color={Colors.light.text} />
                    </TouchableOpacity>
                    <Text style={style.title}>Paramètres</Text>
                    <KeyboardAvoidingView style={style.formContainer} behavior="position">
                        <ScrollView style={{ padding: 10, minWidth: 270 }}>
                            <View style={style.fieldWrapper}>
                                <InputGroup style={{ borderColor: code && !isCodeValid ? Colors.light.error : Colors.light.primary }}>
                                    <TextInput
                                        value={code}
                                        onChangeText={(text) => setCode(text)}
                                        placeholder={"Saisir le code secret"}
                                        textContentType={"password"}
                                        style={[{ fontFamily: "normal", color: "#000", flex: 1 }]}
                                        secureTextEntry={!passwordVisible}
                                        returnKeyType={"done"}
                                        onSubmitEditing={onSubmit}
                                    />
                                    <Pressable onPress={() => setPasswordVisible(!passwordVisible)} style={{ padding: 5 }}>
                                        <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color={Colors.light.text} />
                                    </Pressable>
                                </InputGroup>
                                <Text style={{ color: Colors.light.error, opacity: code && !isCodeValid ? 1 : 0 }}>Code incorrect !</Text>
                            </View>
                            <PrimaryButton onPress={onSubmit} style={[{ minWidth: 120, paddingHorizontal: 10, paddingVertical: 15, marginHorizontal: 15, justifyContent: "center", alignSelf: "center" }]}>
                                <Text style={{ color: "#fff", fontWeight: "700" }}>Valider</Text>
                            </PrimaryButton>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    );
}

export default OpenSettingsModal;

const style = StyleSheet.create({
    formContainer: {
        // flex: 1,
        maxHeight: 220,
        padding: 10,
    },
    fieldWrapper: {
        marginVertical: 2,
        minHeight: 80,
        width: 200,
        // maxWidth: 450,
        alignSelf: "center"
        // paddingHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: "rgba(0,0,0, 0.4)"
    },
    modalView: {
        marginHorizontal: 2,
        backgroundColor: "white",
        padding: 25,
        borderRadius: 5,
        minWidth: 200,
        width: "60%",
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 22,
        textAlign: "center",
        fontWeight: "700"
    }
});