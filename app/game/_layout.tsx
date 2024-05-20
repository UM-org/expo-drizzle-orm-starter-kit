import React from 'react';
import { Link, Redirect, Slot, Stack, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { GameContext } from '@/contexts/GameContext';
import { Text } from '@/components/Themed';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoading, player } = React.useContext(GameContext)

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Chargement...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!player) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/registration" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  />;
}
