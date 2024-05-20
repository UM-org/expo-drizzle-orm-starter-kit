import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Slot, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Slot />
  );
}
