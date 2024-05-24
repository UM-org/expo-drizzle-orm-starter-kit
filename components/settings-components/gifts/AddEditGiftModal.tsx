import React, { useCallback, useContext, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";
import { TextInput, View, Pressable, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Modal, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { InsertGift, SelectGift } from '../../../db/schema';
import useGifts from '../../../hooks/useGifts';
import { FormInput, Label, PrimaryButton } from '../../Themed';
import Colors from '../../../constants/Colors';

export type AddEditGiftModalProps = {
    onClose: () => void
    onAdd: () => void
    isVisible: boolean,
    update?: boolean,
    gift: SelectGift | null
}

const AddEditGiftModal: React.FC<AddEditGiftModalProps> = (props) => {
    const { createGift, updateGift } = useGifts()
    const nameInput = React.useRef<TextInput | null>(null)
    const initialQtyInput = React.useRef<TextInput | null>(null)

    const schema = yup
        .object({
            name: yup.string().required("Le champs Nom est requis !").default(""),
            initial_qty: yup.number().required(`Le champs Quantité est requis!`).min(1, "Vous devez saisir un nombre supérieur à 1 !").default(0),
            actual_qty: yup.number().default(0),
        })
        .required()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = React.useCallback(async (data: InsertGift) => {
        try {
            if (props.update && props.gift) {
                updateGift(props.gift.id, data)
            } else {
                await createGift({ ...data, actual_qty: data.initial_qty })
            }
            props.onAdd()
        } catch (error) {
            console.log(error);
        }
    }, [])

    React.useEffect(() => {
        if (props.update && props?.gift) {
            setValue("name", props?.gift?.name || "", { shouldValidate: true })
            setValue("initial_qty", props?.gift?.initial_qty || 0, { shouldValidate: true })
            setValue("actual_qty", props?.gift?.actual_qty || 0, { shouldValidate: true })
        }
    }, [props?.gift])
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}
            style={{ borderRadius: 5 }}
        >
            <View style={[styles.centeredView]}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => props.onClose?.()}>
                        <AntDesign name="close" size={24} color={Colors.light.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Ajouter un cadeau</Text>
                    <KeyboardAvoidingView style={styles.formContainer} behavior="height">
                        <ScrollView style={{ padding: 10, minWidth: 270, flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.formGroup}>
                                            <Label>Nom <Text style={{ color: Colors.light.error }}>*</Text></Label>
                                            <FormInput
                                                ref={nameInput}
                                                placeholder="Nom"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value || ""}
                                                returnKeyType="next"
                                                onSubmitEditing={() => initialQtyInput?.current?.focus?.()}
                                            />
                                        </View>
                                    )}
                                    name="name"
                                />
                                <Text style={{ opacity: errors.name ? 1 : 0, color: Colors.light.error }}>{errors?.name?.message}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <View style={styles.formGroup}>
                                            <Label>Quantité Initiale<Text style={{ color: Colors.light.error }}>*</Text></Label>
                                            <FormInput
                                                ref={initialQtyInput}
                                                placeholder="Quantité"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value?.toString() || ""}
                                                returnKeyType="done"
                                                keyboardType="numeric"
                                                onSubmitEditing={handleSubmit(onSubmit)}
                                            />
                                        </View>
                                    )}
                                    name="initial_qty"
                                />
                                <Text style={{ opacity: errors.initial_qty ? 1 : 0, color: Colors.light.error }}>{errors?.initial_qty?.message}</Text>
                            </View>
                            {props.update && (
                                <View style={{ flex: 1 }}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <View style={styles.formGroup}>
                                                <Label>Quantité Actuelle<Text style={{ color: Colors.light.error }}>*</Text></Label>
                                                <FormInput
                                                    ref={initialQtyInput}
                                                    placeholder="Quantité Actuelle"
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value?.toString() || ""}
                                                    returnKeyType="done"
                                                    keyboardType="numeric"
                                                    onSubmitEditing={handleSubmit(onSubmit)}
                                                />
                                            </View>
                                        )}
                                        name="actual_qty"
                                    />
                                    <Text style={{ opacity: errors.actual_qty ? 1 : 0, color: Colors.light.error }}>{errors?.actual_qty?.message}</Text>
                                </View>
                            )}
                            <View style={styles.btnContainer}>
                                <PrimaryButton onPress={handleSubmit(onSubmit)} style={[{ flex: 0.7, minWidth: 120, paddingHorizontal: 10, paddingVertical: 15, marginHorizontal: 15, alignItems: "center", justifyContent: "center", marginTop: 10 }]}>
                                    <Text style={[{ fontWeight: "700", color: "#fff" }]}>Valider</Text>
                                </PrimaryButton>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    );
}

export default AddEditGiftModal;

const styles = StyleSheet.create({
    formContainer: {
        // flex: 1,
        maxHeight: 300,
        // padding: 10,
    },
    fieldWrapper: {
        minHeight: 50,
        minWidth: 150,
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
        marginVertical: 40,
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
    btnContainer: {
        paddingBottom: 30,
        flexDirection: "row",
        justifyContent: "center"
    },
    formGroup: {
        minHeight: 60,
        flex: 1,
        padding: 5,
    },
    title: {
        fontSize: 22,
        textAlign: "center"
    }
});