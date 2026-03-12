import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { DrawerSelect } from '@/components/atoms/drawer-select';
import { TextBox } from '@/components/atoms/textbox';
import { ThemedSafeAreaView } from '@/components/atoms/themed-safe-area-view';
import { ThemedText } from '@/components/atoms/themed-text';
import {
  POKEMON_TYPE_OPTIONS,
  SORT_OPTIONS,
  type PokemonType,
  type SortOption,
} from '@/constants/pokemon';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('number-asc');

  return (
    <ThemedSafeAreaView style={styles.container}>
      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search Pokémon"
        placeholder="Search Pokémon"
        returnKeyType="search"
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <DrawerSelect
            value={typeFilter}
            options={POKEMON_TYPE_OPTIONS}
            onChange={setTypeFilter}
            title="Select type"
          />
        </View>
        <View style={styles.filterItem}>
          <DrawerSelect
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={setSortBy}
            title="Sort by"
          />
        </View>
      </View>
      <ThemedText>Pokedex</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterItem: {
    flex: 1,
  },
});
