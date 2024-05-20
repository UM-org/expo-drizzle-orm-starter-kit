import React, { createContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Player } from '@prisma/client';
import usePrisma from '@/hooks/usePrisma';

type ContextProps = {
    player: IPlayer | null;
    reset: () => Promise<void> | void;
    addNewPlayer: (data: NewPlayerData) => Promise<void> | void;
};

const GameContext = createContext<Partial<ContextProps>>({ player: null, reset: () => { return }, addNewPlayer: (data: NewPlayerData) => { return } });

interface Props {
    children: React.ReactNode;
}

const GameProvider = (props: Props) => {
    const prisma = usePrisma();
    const [player, setPlayer] = useState<Player | null>(null);

    const reset = useCallback(async () => {
        setPlayer(null)
    }, [player])

    React.useEffect(() => {
        const prepare = async () => {
            try {
                const _player = await SecureStore.getItem("-player")
                if (_player)
                    setPlayer(JSON.parse(_player))
            } catch (error) {
                console.log(error);
            }
        }
        prepare().then().catch(e => console.log(e))
    }, [])

    const addNewPlayer = useCallback(async (data: NewPlayerData) => {
        try {
            const newPlayer = await prisma.player.create(data)
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