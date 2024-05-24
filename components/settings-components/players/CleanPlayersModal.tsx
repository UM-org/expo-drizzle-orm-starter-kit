import React, { useCallback, useContext, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TextInput, View, Pressable, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Modal, ScrollView, Alert } from 'react-native';
import usePlayers from '../../../hooks/usePlayers';
import Colors from '../../../constants/Colors';

export type CleanDbModalProps = {
    onClose: () => void
    onFinish: () => void
    isVisible: boolean
}

const CleanPlayersModal: React.FC<CleanDbModalProps> = (props) => {
    const { truncate } = usePlayers()

    const onClickConfirm = async () => {
        try {
            await truncate();
            props.onFinish?.()
        } catch (error) {
            console.log(error);
        }
    }
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
                <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 10 }} onPress={() => props.onClose?.()}>
                        <AntDesign name="close" size={24} color={Colors.light.text} />
                    </TouchableOpacity>
                    <Text style={style.title}>Vous allez vider la liste des joueurs.</Text>
                    <Text style={style.title}>Êtes-vous sûr?</Text>
                    <View style={style.btnContainer}>
                        <TouchableOpacity onPress={props.onClose} style={[{ minWidth: 120, paddingHorizontal: 10, paddingVertical: 15, marginHorizontal: 15, alignItems: "center", justifyContent: "center", }]}>
                            <Text style={[{ fontWeight: "700" }]}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClickConfirm} style={[{ backgroundColor: "red", borderColor: "red", minWidth: 120, paddingHorizontal: 10, paddingVertical: 15, marginHorizontal: 15, alignItems: "center", justifyContent: "center", }]}>
                            <Text style={[{ fontWeight: "700" }]}>Confirmer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default CleanPlayersModal;

const style = StyleSheet.create({
    formContainer: {
        // flex: 1,
        maxHeight: 350,
        padding: 10,
    },
    fieldWrapper: {
        marginVertical: 2,
        minHeight: 80,
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
        marginTop: 30,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "center"
    },
    title: {
        fontSize: 22,
        textAlign: "center"
    }
});