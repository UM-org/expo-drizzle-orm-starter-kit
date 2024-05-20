import React, { createContext, useState, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import usePrisma from '@/hooks/usePrisma';

type ContextProps = {
    updateSetting: (prop: string, value: string | boolean | number | null) => void;
};

const SettingsContext = createContext<Partial<ContextProps>>({ updateSetting: (prop: string, value: string | boolean | number | null) => null });

interface Props {
    children: React.ReactNode;
}

const SettingsProvider = (props: Props) => {
    const { initializeDb } = usePrisma();
    React.useEffect(() => {
        initializeDb().then().catch(e => console.log(e))
    }, []);

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