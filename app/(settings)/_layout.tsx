import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, router } from 'expo-router';
import { Pressable, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.primary,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          alignItems: "center"
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: "center"
        },
        headerTitleAlign: "center",
        tabBarActiveTintColor: Colors.light.primary,
        headerLeft: () => <TouchableOpacity onPress={() => router.back()} style={{ marginHorizontal: 10 }}>
          <FontAwesome name="arrow-left" size={28} style={{ margin: 2 }} color="white" />
        </TouchableOpacity>,
        tabBarStyle: {
          minHeight: 65,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 16,
          fontWeight: "700"
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Paramètres',
          tabBarIcon: ({ color, size }) => <Entypo name="game-controller" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="gifts"
        options={{
          title: 'Cadeaux',
          tabBarIcon: ({ color, size }) => <AntDesign name="gift" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="players"
        options={{
          title: 'Joueurs',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-friends" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
