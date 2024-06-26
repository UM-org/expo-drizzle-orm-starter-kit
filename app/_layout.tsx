import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { SettingsContext, SettingsProvider } from '@/contexts/SettingsContext';
import { GameProvider } from '@/contexts/GameContext';
import React from 'react';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { DrizzleProvider } from '@/contexts/DrizzleContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
  settings: {
    initialRouteName: 'gifts',
  }
};


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    AbdoMasterRegular: require('@/assets/fonts/Abdo-Master-Regular.otf'),
    AbdoMasterHeavy: require('@/assets/fonts/Abdo-Master-Heavy.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DrizzleProvider>
        <SettingsProvider>
          <GameProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(settings)" options={{ headerShown: false }} />
              <Stack.Screen name="game" options={{ headerShown: false }} />
              <Stack.Screen name="registration" options={{ headerShown: false }} />
            </Stack>
          </GameProvider>
        </SettingsProvider>
      </DrizzleProvider>
    </ThemeProvider>
  );
}
