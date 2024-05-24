import React from 'react';
import { Link, Redirect, Slot, Stack, Tabs, useRootNavigationState } from 'expo-router';
import { GameContext } from '@/contexts/GameContext';
import { Text } from '@/components/Themed';
import LoaderScreen from '@/components/reusable/LoaderScreen';

export default function TabLayout() {
  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return <LoaderScreen />;
  const { isLoading, player } = React.useContext(GameContext)

  if (isLoading) {
    return <Text>Chargement...</Text>;
  }

  if (!player) {
    return <Redirect href="/registration" />;
  }

  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  />;
}
