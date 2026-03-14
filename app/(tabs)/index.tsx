import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

import type { PokemonListItem } from '@/api/pokemon/types';
import { MagikarpEmptyState } from '@/components/atoms/magikarp-empty-state';
import { TextBox } from '@/components/atoms/textbox';
import { ThemedSafeAreaView } from '@/components/atoms/themed-safe-area-view';
import { ThemedText } from '@/components/atoms/themed-text';
import { DrawerSelect } from '@/components/molecules/drawer-select';
import { PokemonCard } from '@/components/molecules/pokemon-card';
import {
    POKEMON_TYPE_OPTIONS,
    type PokemonType,
    type Region,
    REGION_OPTIONS,
    SORT_OPTIONS,
    type SortOption
} from '@/constants/pokemon';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useDebounce } from '@/hooks/useDebounce';
import { useFavoritesList } from '@/hooks/useFavoritesList';
import { usePokemonsByRegion, usePokemonsByType, usePokemonsByTypeAndRegion } from '@/hooks/usePokemon';
import { usePokemonList } from '@/hooks/usePokemonList';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { usePokemonTypes } from '@/hooks/usePokemonTypes';
import { useFavoritesStore } from '@/store/useFavoritesStore';

const favCheckedUri = Asset.fromModule(require('@/assets/svg/fav-checked.svg')).uri;
const favUncheckedUri = Asset.fromModule(require('@/assets/svg/fav_unchecked.svg')).uri;

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonType>('all');
  const [regionFilter, setRegionFilter] = useState<Region>('all');
  const [sortBy, setSortBy] = useState<SortOption>('number-asc');
  const [showFavorites, setShowFavorites] = useState(false);

  const debouncedQuery = useDebounce(query, 400);
  const trimmedQuery = debouncedQuery.trim().toLowerCase();
  const isFavoritesMode = showFavorites;
  const isSearching = !isFavoritesMode && trimmedQuery.length >= 2;
  
  const hasTypeFilter = typeFilter !== 'all';
  const hasRegionFilter = regionFilter !== 'all';
  const isFiltered = !isSearching && !isFavoritesMode && (hasTypeFilter || hasRegionFilter);

  const selectedRegion = REGION_OPTIONS.find((r) => r.value === regionFilter);
  const minId = selectedRegion?.startId ?? 0;
  const maxId = selectedRegion?.endId ?? 0;

  const listQuery = usePokemonList(sortBy);
  const typeQuery = usePokemonsByType(typeFilter, sortBy);
  const regionQuery = usePokemonsByRegion(minId, maxId, sortBy);
  const typeAndRegionQuery = usePokemonsByTypeAndRegion(typeFilter, minId, maxId, sortBy);
  
  const favoritesQuery = useFavoritesList(isFavoritesMode, sortBy, typeFilter);
  const searchQuery = usePokemonSearch(debouncedQuery);
  const {data: typeOptions = POKEMON_TYPE_OPTIONS} = usePokemonTypes();
  const totalFavorites = useFavoritesStore((s) => s.items.length);

  const pillBackground = useThemeColor({}, 'text');

  const isLoading =
    isFavoritesMode ? favoritesQuery.isLoading
    : isSearching ? searchQuery.isFetching
    : (hasTypeFilter && hasRegionFilter) ? typeAndRegionQuery.isLoading
    : hasRegionFilter ? regionQuery.isLoading
    : hasTypeFilter ? typeQuery.isLoading
    : listQuery.isLoading;

  const isFetchingNextPage = listQuery.isFetchingNextPage;

  const pokemons = useMemo((): PokemonListItem[] => {
    if (isFavoritesMode) {
        let filtered = favoritesQuery.data ?? [];
      
      if (trimmedQuery.length >= 2) {
        filtered = filtered.filter((p) => p.name.includes(trimmedQuery));
      }
      
      if (hasRegionFilter && minId && maxId) {
        filtered = filtered.filter((p) => p.id >= minId && p.id <= maxId);
      }
      
      return filtered;
    }
    if (isSearching) return searchQuery.data ?? [];
    if (hasTypeFilter && hasRegionFilter) return typeAndRegionQuery.data ?? [];
    if (hasRegionFilter) return regionQuery.data ?? [];
    if (hasTypeFilter) return typeQuery.data ?? [];
    return listQuery.data?.pages.flatMap((p) => p.results) ?? [];
  }, [
    isFavoritesMode, 
    isSearching, 
    hasTypeFilter, 
    hasRegionFilter, 
    trimmedQuery, 
    searchQuery.data, 
    favoritesQuery.data, 
    typeQuery.data, 
    regionQuery.data, 
    typeAndRegionQuery.data, 
    listQuery.data,
    minId,
    maxId
  ]);

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
            value={regionFilter}
            options={REGION_OPTIONS}
            onChange={setRegionFilter}
            title="Select region"
          />
        </View>
        <View style={styles.iconItem}>
          <DrawerSelect
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={setSortBy}
            title="Sort by"
            type="icon"
            icon="swap-vertical"
          />
        </View>
        <View style={styles.iconItem}>
          <Pressable
            style={[styles.heartPill, {backgroundColor: showFavorites ? '#FD525C' : pillBackground}]}
            onPress={() => setShowFavorites((prev) => !prev)}
            accessibilityLabel={showFavorites ? 'Show all Pokémon' : 'Show favorites'}
            accessibilityRole="button"
          >
            <SvgUri uri={showFavorites ? favCheckedUri : favUncheckedUri} width={24} height={24} />
          </Pressable>
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
          {isFavoritesMode && totalFavorites === 0 ? (
            <View style={styles.emptyTextContainer}>
              <ThemedText type="subtitle" style={styles.emptyText}>
                You don&apos;t have your favorite Pokémon :(
              </ThemedText>
              <ThemedText style={styles.emptyText}>
                Click the heart icon on your favorite Pokémon and they will appear here.
              </ThemedText>
            </View>
          ) : (
            <ThemedText type="defaultSemiBold" style={styles.emptyText}>
              {isFavoritesMode
                ? 'No favorites match your current filters'
                : 'No Pokémon found'}
            </ThemedText>
          )}
        </View>
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (!isSearching && !isFavoritesMode && !isFiltered && listQuery.hasNextPage && !isFetchingNextPage) {
              listQuery.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={styles.footer} /> : null
          }
          renderItem={({item}) => (
            <Pressable onPress={() => router.push({ pathname: '/pokemon/[id]' as any, params: { id: item.id } })}>
              <PokemonCard id={item.id} name={item.name} />
            </Pressable>
          )}
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
    gap: 8,
  },
  filterItem: {
    flex: 1,
  },
  iconItem: {
    width: 42,
    aspectRatio: 1,
  },
  heartPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
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
