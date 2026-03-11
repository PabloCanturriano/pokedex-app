import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { FavoritesTabIcon } from '@/components/icons/FavoritesTabIcon';
import { PokedexTabIcon } from '@/components/icons/PokedexTabIcon';
import { RegionsTabIcon } from '@/components/icons/RegionsTabIcon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokedex',
          tabBarIcon: ({ focused, size }) => <PokedexTabIcon focused={focused} size={size} />,
        }}
      />
      <Tabs.Screen
        name="regions"
        options={{
          title: 'Regions',
          tabBarIcon: ({ focused, size }) => <RegionsTabIcon focused={focused} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused, size }) => <FavoritesTabIcon focused={focused} size={size} />,
        }}
      />
    </Tabs>
  );
}
