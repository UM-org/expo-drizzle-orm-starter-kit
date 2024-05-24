import { eq } from "drizzle-orm/sql";
import { db } from "../db/client";
import { InsertPlayer, SelectPlayer, insertPlayerSchema, players } from "../db/schema";
import { Value } from '@sinclair/typebox/value';

const usePlayers = () => {
    const fetchAllPlayers = async (): Promise<SelectPlayer[]> => {
        const data = await db?.select().from(players)
        return data
    }
    const createPlayer = async (playerData: InsertPlayer): Promise<SelectPlayer | undefined> => {
        const isPlayerValid: boolean = Value.Check(insertPlayerSchema, playerData);
        if (!isPlayerValid) throw new Error("Invalid Schema Types !");
        const data = (await db.insert(players).values(playerData).returning()).shift()
        return data
    }
    const updatePlayer = async (id: number, playerData: InsertPlayer): Promise<SelectPlayer | undefined> => {
        const data = (await db.update(players).set(playerData).where(eq(players.id, id)).returning()).shift()
        return data
    }
    const truncate = async (): Promise<void> => {
        await db.delete(players);
    }
    return {
        fetchAllPlayers,
        createPlayer,
        updatePlayer,
        truncate
    };
}
export default usePlayers;