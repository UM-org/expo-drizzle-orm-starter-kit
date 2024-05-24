import { Text, View, TextInput, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from "react-native"
import Colors from "@/constants/Colors"
import inscription from "@/assets/images/inscription.png";
import btn from "@/assets/images/next.png";
import { InsertPlayer } from "../../db/schema";
import { FormInput, Label } from "../Themed";
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import React from "react";
import { GameContext } from "../../contexts/GameContext";
import { router } from "expo-router";

export default function RegistrationForm() {
    const { player, addNewPlayer } = React.useContext(GameContext);
    const firstNameInput = React.useRef<TextInput | null>(null)
    const lastNameInput = React.useRef<TextInput | null>(null)
    const phoneInput = React.useRef<TextInput | null>(null)
    const addressInput = React.useRef<TextInput | null>(null)

    const schema = yup
        .object({
            last_name: yup.string().required("Le champs Nom est requis !"),
            first_name: yup.string().required("Le champs Prénom est requis !"),
            phone: yup.string().required("Le champs Tél est requis !").min(8, "Le champs Tél doit être un numéro de téléphone valide !"),
            address: yup.string().default(""),
        })
        .required()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = React.useCallback(async (data: InsertPlayer) => {
        await addNewPlayer?.(data)
    }, [])

    React.useEffect(() => {
        if (player)
            router.replace("/game/")
    }, [player])

    return (
        <View style={styles.container}>
            <Image source={inscription} resizeMode='center' style={{ maxWidth: "100%", maxHeight: "100%" }} />
            <ScrollView style={{ paddingHorizontal: '5%', marginVertical: 5 }}>
                <TouchableWithoutFeedback>
                    <KeyboardAvoidingView behavior="padding">
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <View style={{ flex: 0.5 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.formGroup}>
                                            <Label>Nom <Text style={{ color: Colors.light.error }}>*</Text></Label>
                                            <FormInput
                                                ref={lastNameInput}
                                                placeholder="Nom"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value || ""}
                                                returnKeyType="next"
                                                onSubmitEditing={() => firstNameInput?.current?.focus?.()}
                                            />
                                        </View>
                                    )}
                                    name="last_name"
                                />
                                <Text style={{ opacity: errors.last_name ? 1 : 0, color: Colors.light.error }}>{errors?.last_name?.message}</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.formGroup}>
                                            <Label>Prénom <Text style={{ color: Colors.light.error }}>*</Text></Label>
                                            <FormInput
                                                ref={firstNameInput}
                                                placeholder="Prénom"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value || ""}
                                                returnKeyType="next"
                                                onSubmitEditing={() => phoneInput?.current?.focus?.()}
                                            />
                                        </View>
                                    )}
                                    name="first_name"
                                />
                                <Text style={{ opacity: errors.first_name ? 1 : 0, color: Colors.light.error }}>{errors?.first_name?.message}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <View style={{ flex: 0.5 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.formGroup}>
                                            <Label>Tél <Text style={{ color: Colors.light.error }}>*</Text></Label>
                                            <FormInput
                                                ref={phoneInput}
                                                placeholder="Tél"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value || ""}
                                                keyboardType="numeric"
                                                returnKeyType="next"
                                                onSubmitEditing={() => addressInput?.current?.focus?.()}
                                            />
                                        </View>
                                    )}
                                    name="phone"
                                />
                                <Text style={{ opacity: errors.phone ? 1 : 0, color: Colors.light.error }}>{errors?.phone?.message}</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.formGroup}>
                                            <Label>Adresse</Label>
                                            <FormInput
                                                ref={addressInput}
                                                placeholder="Adresse"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value || ""}
                                                returnKeyType="done"
                                                onSubmitEditing={handleSubmit(onSubmit)}
                                            />
                                        </View>
                                    )}
                                    name="address"
                                />
                                <Text style={{ opacity: errors.address ? 1 : 0, color: Colors.light.error }}>{errors?.address?.message}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ alignSelf: "flex-end", marginVertical: 10 }}>
                            <Image source={btn} />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.62,
        backgroundColor: "rgba(255,255,255, 0.85)",
        borderRadius: 8,
        width: "75%",
        padding: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formGroup: {
        minHeight: 60,
        flex: 1,
        padding: 5
    },
});