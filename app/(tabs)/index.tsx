import {useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import {DrawerSelect} from '@/components/atoms/drawer-select';
import {PokemonCard} from '@/components/atoms/pokemon-card';
import {TextBox} from '@/components/atoms/textbox';
import {ThemedSafeAreaView} from '@/components/atoms/themed-safe-area-view';
import {ThemedText} from '@/components/atoms/themed-text';
import {MagikarpEmptyState} from '@/components/icons/MagikarpEmptyState';
import {POKEMON_TYPE_OPTIONS, type PokemonType, SORT_OPTIONS, type SortOption,} from '@/constants/pokemon';
import {useDebounce} from '@/hooks/useDebounce';
import {usePokemonList} from '@/hooks/usePokemonList';
import {usePokemonsByType} from '@/hooks/usePokemon';
import {usePokemonSearch} from '@/hooks/usePokemonSearch';
import {usePokemonTypes} from '@/hooks/usePokemonTypes';

function idFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return parseInt(parts[parts.length - 1], 10);
}

type ListItem = { name: string; url: string };

function sortList(list: ListItem[], sort: SortOption): ListItem[] {
  const copy = [...list];
  if (sort === 'number-desc') return copy.sort((a, b) => idFromUrl(b.url) - idFromUrl(a.url));
  return copy.sort((a, b) => idFromUrl(a.url) - idFromUrl(b.url));
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('number-asc');

  const debouncedQuery = useDebounce(query, 400);
  const isSearching = debouncedQuery.trim().length >= 2;
  const isFiltered = !isSearching && typeFilter !== 'all';

  const listQuery = usePokemonList(sortBy);
  const typeQuery = usePokemonsByType(typeFilter);
  const searchQuery = usePokemonSearch(debouncedQuery);
  const { data: typeOptions = POKEMON_TYPE_OPTIONS } = usePokemonTypes();

  const isLoading =
    isSearching ? searchQuery.isFetching
    : isFiltered ? typeQuery.isLoading
    : listQuery.isLoading;

  const isFetchingNextPage = listQuery.isFetchingNextPage;

  const rawList: ListItem[] = useMemo(() => {
    if (isSearching) {
      if (!searchQuery.data) return [];
      const p = searchQuery.data;
      return [{ name: p.name, url: `https://pokeapi.co/api/v2/pokemon/${p.id}/` }];
    }
    if (isFiltered) {
      return typeQuery.data?.pokemon.map((e) => ({ name: e.pokemon.name, url: e.pokemon.url })) ?? [];
    }
    return listQuery.data?.pages.flatMap((p) => p.results) ?? [];
  }, [isSearching, isFiltered, searchQuery.data, typeQuery.data, listQuery.data]);

  const pokemons = useMemo(() => sortList(rawList, sortBy), [rawList, sortBy]);

  const showNotFound = isSearching && !searchQuery.isFetching && searchQuery.isError;
  const showEmpty = !isLoading && !showNotFound && pokemons.length === 0;

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
      ) : showNotFound ? (
        <View style={styles.emptyState}>
          <MagikarpEmptyState />
          <View style={styles.emptyTextContainer}>
            <ThemedText type="defaultSemiBold" style={styles.emptyText}>
              No Pokémon found for &quot;{debouncedQuery}&quot;
            </ThemedText>
            <ThemedText style={styles.emptyText}>Try the exact name, e.g. &quot;charizard&quot;</ThemedText>
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
          keyExtractor={(item) => item.name}
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
