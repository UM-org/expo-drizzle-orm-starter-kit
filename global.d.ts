namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        APP_NAME: string;
        EXPO_PUBLIC_ADMIN_CODE?: string;
    }
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.json';