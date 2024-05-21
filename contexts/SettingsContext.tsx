import React, { createContext, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import migrations from '@/drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '@/db/client';

type ContextProps = {
    updateSetting: (prop: string, value: string | boolean | number | null) => void;
    isLoadingDB: boolean
};

const SettingsContext = createContext<Partial<ContextProps>>({ updateSetting: (prop: string, value: string | boolean | number | null) => null });

interface Props {
    children: React.ReactNode;
}

const SettingsProvider = (props: Props) => {
    const { success, error } = useMigrations(db, migrations);

    const isLoadingDB = React.useMemo(() => {
        return !success
    }, [success])
    
    const updateSetting = useCallback(async (prop: string, value: string | boolean | number | null) => {
        // setIsAdmin(value)
    }, [])

    return (
        <SettingsContext.Provider
            value={{
                updateSetting,
                isLoadingDB
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
export { SettingsContext, SettingsProvider };