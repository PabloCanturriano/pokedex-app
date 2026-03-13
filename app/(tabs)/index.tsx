import {useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import {DrawerSelect} from '@/components/atoms/drawer-select';
import {PokemonCard} from '@/components/atoms/pokemon-card';
import {TextBox} from '@/components/atoms/textbox';
import {ThemedSafeAreaView} from '@/components/atoms/themed-safe-area-view';
import {ThemedText} from '@/components/atoms/themed-text';
import {MagikarpEmptyState} from '@/components/icons/MagikarpEmptyState';
import type {PokemonListItem} from '@/api/pokemon/types';
import {POKEMON_TYPE_OPTIONS, type PokemonType, SORT_OPTIONS, type SortOption,} from '@/constants/pokemon';
import {useDebounce} from '@/hooks/useDebounce';
import {usePokemonList} from '@/hooks/usePokemonList';
import {usePokemonsByType} from '@/hooks/usePokemon';
import {usePokemonSearch} from '@/hooks/usePokemonSearch';
import {usePokemonTypes} from '@/hooks/usePokemonTypes';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('number-asc');

  const debouncedQuery = useDebounce(query, 400);
  const isSearching = debouncedQuery.trim().length >= 2;
  const isFiltered = !isSearching && typeFilter !== 'all';

  const listQuery = usePokemonList(sortBy);
  const typeQuery = usePokemonsByType(typeFilter, sortBy);
  const searchQuery = usePokemonSearch(debouncedQuery);
  const { data: typeOptions = POKEMON_TYPE_OPTIONS } = usePokemonTypes();

  const isLoading =
    isSearching ? searchQuery.isFetching
    : isFiltered ? typeQuery.isLoading
    : listQuery.isLoading;

  const isFetchingNextPage = listQuery.isFetchingNextPage;

  const pokemons = useMemo((): PokemonListItem[] => {
    if (isSearching) return searchQuery.data ?? [];
    if (isFiltered) return typeQuery.data ?? [];
    return listQuery.data?.pages.flatMap((p) => p.results) ?? [];
  }, [isSearching, isFiltered, searchQuery.data, typeQuery.data, listQuery.data]);

  const showSearchEmpty = isSearching && !searchQuery.isFetching && pokemons.length === 0;
  const showEmpty = !isLoading && !showSearchEmpty && pokemons.length === 0;

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
            options={typeOptions}
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
      ) : showSearchEmpty ? (
        <View style={styles.emptyState}>
          <MagikarpEmptyState />
          <View style={styles.emptyTextContainer}>
            <ThemedText type="defaultSemiBold" style={styles.emptyText}>
              No Pokémon found for &quot;{debouncedQuery}&quot;
            </ThemedText>
            <ThemedText style={styles.emptyText}>Try a partial name, e.g. &quot;char&quot;</ThemedText>
          </View>
        </View>
      ) : showEmpty ? (
        <View style={styles.emptyState}>
          <MagikarpEmptyState />
          <ThemedText type="defaultSemiBold" style={styles.emptyText}>No Pokémon found</ThemedText>
        </View>
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (!isSearching && !isFiltered && listQuery.hasNextPage && !isFetchingNextPage) {
              listQuery.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
          }
          renderItem={({ item }) => <PokemonCard id={item.id} name={item.name} />}
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  emptyTextContainer: {
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    textAlign: 'center',
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
