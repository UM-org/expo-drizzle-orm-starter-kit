import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Slot, Stack, Tabs, useRootNavigationState } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import LoaderScreen from '@/components/reusable/LoaderScreen';

export default function TabLayout() {
  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return <LoaderScreen />;
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
