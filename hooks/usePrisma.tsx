import { PrismaClient } from '@prisma/client/react-native';
import { SplashScreen } from 'expo-router';

const baseClient = new PrismaClient();

const usePrisma = () => {
    const initializeDb = async () => {
        try {
            baseClient.$applyPendingMigrations();
        } catch (e) {
            console.error(`failed to apply migrations: ${e}`);
            throw new Error(
                'Applying migrations failed, your app is now in an inconsistent state. We cannot guarantee safety, it is now your responsibility to reset the database or tell the user to re-install the app'
            );
        } finally {
            await SplashScreen.hideAsync();
        }
    }
    return {
        prisma: baseClient,
        initializeDb
    }
};
export default usePrisma;