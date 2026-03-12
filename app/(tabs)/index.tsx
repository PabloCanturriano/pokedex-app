import {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import {DrawerSelect} from '@/components/atoms/drawer-select';
import {PokemonCard} from '@/components/atoms/pokemon-card';
import {TextBox} from '@/components/atoms/textbox';
import {ThemedSafeAreaView} from '@/components/atoms/themed-safe-area-view';
import {POKEMON_TYPE_OPTIONS, type PokemonType, SORT_OPTIONS, type SortOption,} from '@/constants/pokemon';
import {usePokemonList} from '@/hooks/usePokemonList';


function idFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('number-asc');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = usePokemonList();

  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];

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

      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
          }
          renderItem={({ item }) => {
            const id = idFromUrl(item.url);
            return <PokemonCard id={id} name={item.name} />;
          }}
        />
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterItem: {
    flex: 1,
  },
  loader: {
    flex: 1,
  },
  list: {
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  footer: {
    paddingVertical: 16,
  },
});
