import React, { createContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { InsertPlayer, SelectPlayer, players } from '@/db/schema';
import { db } from '@/db/client';

type GameContextProps = {
    player: SelectPlayer | null;
    isLoading: boolean;
    reset: () => Promise<void> | void;
    addNewPlayer: (data: InsertPlayer) => Promise<void> | void;
};

const GameContext = createContext<Partial<GameContextProps>>({ isLoading: true, player: null, reset: () => { return }, addNewPlayer: (data: InsertPlayer) => { return } });

interface Props {
    children: React.ReactNode;
}

const GameProvider = (props: Props) => {
    const [player, setPlayer] = useState<SelectPlayer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const reset = useCallback(async () => {
        setPlayer(null)
    }, [player])

    React.useEffect(() => {
        const prepare = async () => {
            try {
                const _player = await SecureStore.getItemAsync("-player")
                if (_player)
                    setPlayer(JSON.parse(_player))
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        prepare().then().catch(e => console.log(e))
    }, [])

    const addNewPlayer = useCallback(async (data: InsertPlayer) => {
        try {
            const newPlayer = (await db.insert(players).values(data).returning()).shift()
            if (newPlayer) {
                setPlayer(newPlayer)
            } else {
                Alert.alert("Erreur", "Le joueur n'a pas pu être ajouté. Veuillez réessayer plus tard.")
            }
        } catch (error) {
            console.log(error);
            if (String(error).includes("UNIQUE constraint failed: players.phone")) {
                Alert.alert("Numéro de téléphone existe !", "Ce numéro de téléphone existe déjà !")
            }
            else if (String(error).includes("UNIQUE constraint failed: players.cin")) {
                Alert.alert("Numéro de CIN existe !", "Ce numéro de CIN existe déjà !")
            }
            else {
                Alert.alert("Erreur", "Le joueur n'a pas pu être ajouté. Veuillez réessayer plus tard.")
            }
        }
    }, [])

    React.useEffect(() => {
        handleStorage()
    }, [player])
    const handleStorage = useCallback(async () => {
        if (player) {
            await SecureStore.setItemAsync("-player", JSON.stringify(player))
        } else {
            await SecureStore.deleteItemAsync("-player")
        }
    }, [player])
    return (
        <GameContext.Provider
            value={{
                isLoading,
                player,
                addNewPlayer,
                reset
            }}
        >
            {props.children}
        </GameContext.Provider>
    );
};

export { GameContext, GameProvider };