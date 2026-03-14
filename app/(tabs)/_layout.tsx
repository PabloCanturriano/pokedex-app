import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/atoms/haptic-tab';
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
      }}
    >
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
    </Tabs>
  );
}
