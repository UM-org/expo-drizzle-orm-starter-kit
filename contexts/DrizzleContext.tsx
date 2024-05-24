import React, { createContext, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import migrations from '@/drizzle/migrations';
import { migrate, useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '@/db/client';

type ContextProps = {
    isRunningMigration: boolean
};

const DrizzleContext = createContext<Partial<ContextProps>>({});

interface Props {
    children: React.ReactNode;
}

const DrizzleProvider = (props: Props) => {
    const { success, error } = useMigrations(db, migrations)

    const isRunningMigration = React.useMemo(() => {
        return !success && !error
    }, [success])
    console.log(isRunningMigration);
    
    React.useEffect(() => {
        if (!isRunningMigration && error) {
            console.error(`Failed to apply migrations: ${error} !`);
            throw new Error("Applying migrations failed, your app is now in an inconsistent state. We cannot guarantee safety, it is now your responsibility to reset the database or tell the user to re-install the app");
        }
    }, [error, isRunningMigration])

    React.useEffect(() => {
        if (success)
            console.log(`Migrations Applied successfully !`);
    }, [success])

    React.useEffect(() => {
        if (isRunningMigration) console.log(`Applying pending migrations...`);
    }, [isRunningMigration])

    React.useEffect(() => {
        if (isRunningMigration) {
            SplashScreen.preventAutoHideAsync().then().catch(e => console.log(e));
        } else {
            SplashScreen.hideAsync().then().catch(e => console.log(e));
        }
    }, [isRunningMigration])

    return (
        <DrizzleContext.Provider
            value={{
                isRunningMigration,
            }}
        >
            {props.children}
        </DrizzleContext.Provider>
    );
};
export { DrizzleContext, DrizzleProvider };