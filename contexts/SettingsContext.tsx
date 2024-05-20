import React, { createContext, useState, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';

type ContextProps = {
    updateSetting: (prop: string, value: string | boolean | number | null) => void;
};

const SettingsContext = createContext<Partial<ContextProps>>({ updateSetting: (prop: string, value: string | boolean | number | null) => null });

interface Props {
    children: React.ReactNode;
}

const SettingsProvider = (props: Props) => {
    // React.useEffect(() => {
    // 	const prepare = async () => {
    // 		try {
    // 			const oldValues = await SecureStore.getItemAsync("@tablette")
    // 			if (oldValues) {
    // 				setTab(JSON.parse(oldValues))
    // 			} else {
    // 				Alert.alert("Appareil non configuré !", "Veuillez saisir les cadeaux.")
    // 			}
    // 		} catch (error) {
    // 			console.warn(error)
    // 		}
    // 		finally {
    // 			await SplashScreen.hideAsync();
    // 		}
    // 	}
    // 	prepare().then().catch(e => console.log(e))
    // }, []);

    const updateSetting = useCallback(async (prop: string, value: string | boolean | number | null) => {
        // setIsAdmin(value)
    }, [])

    return (
        <SettingsContext.Provider
            value={{
                updateSetting,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
const style = StyleSheet.create({
    iosStyle: {
        position: "absolute",
        zIndex: 99999,
    },
})
export { SettingsContext, SettingsProvider };