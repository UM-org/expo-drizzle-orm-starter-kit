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
    const prisma = usePrisma();
    React.useEffect(() => {
        const initializeDb = async () => {
            try {
                prisma.$applyPendingMigrations();
            } catch (e) {
                console.error(`failed to apply migrations: ${e}`);
                throw new Error(
                    'Applying migrations failed, your app is now in an inconsistent state. We cannot guarantee safety, it is now your responsibility to reset the database or tell the user to re-install the app'
                );
            } finally {
                await SplashScreen.hideAsync();
            }
        }
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