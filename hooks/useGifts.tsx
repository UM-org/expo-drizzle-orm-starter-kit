import { eq } from "drizzle-orm/sql";
import { db } from "@/db/client";
import { InsertGift, SelectGift, gifts, insertGiftSchema } from "@/db/schema";
import { Value } from '@sinclair/typebox/value';

const useGifts = () => {
    const fetchAllGifts = async (): Promise<SelectGift[]> => {
        const data = await db?.select().from(gifts)
        return data
    }
    const createGift = async (giftData: InsertGift): Promise<SelectGift | undefined> => {
        const isGiftValid: boolean = Value.Check(insertGiftSchema, giftData);
        if (!isGiftValid) throw new Error("Invalid Schema Types !");
        const data = (await db.insert(gifts).values(giftData).returning()).shift()
        return data
    }
    const updateGift = async (id: number, giftData: InsertGift): Promise<SelectGift | undefined> => {
        const data = (await db.update(gifts).set(giftData).where(eq(gifts.id, id)).returning()).shift()
        return data
    }
    const truncate = async (): Promise<void> => {
        await db.delete(gifts);
    }
    const deleteGift = async (id: number): Promise<void> => {
        await db.delete(gifts).where(eq(gifts.id, id));
    }
    return {
        fetchAllGifts,
        createGift,
        updateGift,
        truncate,
        deleteGift
    };
}
export default useGifts;