import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/atoms/haptic-tab';
import { ItemsTabIcon } from '@/components/icons/ItemsTabIcon';
import { PokedexTabIcon } from '@/components/icons/PokedexTabIcon';
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
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
        name="items"
        options={{
          title: 'Items',
          tabBarIcon: ({ focused, size, color }) => (
            <ItemsTabIcon focused={focused} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}