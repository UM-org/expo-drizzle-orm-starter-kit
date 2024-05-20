import { PrismaClient } from '@prisma/client/react-native';
import { reactiveHooksExtension } from '@prisma/react-native';

const baseClient = new PrismaClient();

const usePrisma = () => {
    return baseClient.$extends(reactiveHooksExtension);
};
export default usePrisma;