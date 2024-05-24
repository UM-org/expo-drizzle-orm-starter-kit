namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        EXPO_PUBLIC_APP_NAME?: string;
        EXPO_PUBLIC_DB_NAME?: string;
        EXPO_PUBLIC_ADMIN_CODE?: string;
        EXPO_PUBLIC_SUPER_ADMIN_CODE?: string;
    }
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.json';