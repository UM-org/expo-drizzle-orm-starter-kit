import React, { createContext, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

type Settings = {
    winProbability: number
};

type ContextProps = {
    updateSetting: (prop: string, value: any) => void;
    settings: Settings
    isSuperAdmin: boolean
    setIsSuperAdmin: (v: boolean) => void
};

const SettingsContext = createContext<Partial<ContextProps>>({
    updateSetting: (prop: string, value: any) => null,
    isSuperAdmin: false,
    settings: {
        winProbability: 0.8
    }
});

interface Props {
    children: React.ReactNode;
}

const SettingsProvider = (props: Props) => {
    const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
    const [settings, setSettings] = React.useState<Settings>({ winProbability: 0.8 });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    console.log("settings : ", settings);

    React.useEffect(() => {
        const prepare = async () => {
            try {
                const _settings = await SecureStore.getItemAsync("-settings")
                console.log("_settings", _settings);
                if (_settings)
                    setSettings(JSON.parse(_settings))
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        prepare().then().catch(e => console.log(e))
    }, [])

    const updateSetting = useCallback(async (prop: string, value: any) => {
        const _settings = { ...settings, [prop]: value }
        setSettings(_settings)
        await handleStorage(_settings)
    }, [settings])

    const handleStorage = useCallback(async (_settings: Settings) => {
        await SecureStore.setItemAsync("-settings", JSON.stringify(_settings))
    }, [settings])

    return (
        <SettingsContext.Provider
            value={{
                updateSetting,
                settings,
                isSuperAdmin,
                setIsSuperAdmin
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
export { SettingsContext, SettingsProvider };