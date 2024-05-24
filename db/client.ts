import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite/next"

const expoDb = openDatabaseSync(process.env.EXPO_PUBLIC_DB_NAME || "app.db", {
    useNewConnection: true
})

export const db = drizzle(expoDb)