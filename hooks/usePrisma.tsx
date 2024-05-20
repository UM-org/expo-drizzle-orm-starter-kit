import { PrismaClient } from '@prisma/client/react-native';

const baseClient = new PrismaClient();

const usePrisma = () => {
    return baseClient
};
export default usePrisma;