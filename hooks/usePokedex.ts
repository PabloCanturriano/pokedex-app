import { useMemo, useState } from 'react';

import type { PokemonListItem } from '@/api/pokemon/types';
import {
  POKEMON_TYPE_OPTIONS,
  type PokemonType,
  type Region,
  REGION_OPTIONS,
  type SortOption,
} from '@/constants/pokemon';
import { useDebounce } from '@/hooks/useDebounce';
import { useFavoritesList } from '@/hooks/useFavoritesList';
import { usePokemonsByRegion, usePokemonsByType, usePokemonsByTypeAndRegion } from '@/hooks/usePokemon';
import { usePokemonList } from '@/hooks/usePokemonList';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { usePokemonTypes } from '@/hooks/usePokemonTypes';
import { useFavoritesStore } from '@/store/useFavoritesStore';

export function usePokedex() {
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
  const { data: typeOptions = POKEMON_TYPE_OPTIONS } = usePokemonTypes();
  const totalFavorites = useFavoritesStore((s) => s.items.length);

  const isLoading =
    isFavoritesMode ? favoritesQuery.isLoading
    : isSearching ? searchQuery.isFetching
    : hasTypeFilter && hasRegionFilter ? typeAndRegionQuery.isLoading
    : hasRegionFilter ? regionQuery.isLoading
    : hasTypeFilter ? typeQuery.isLoading
    : listQuery.isLoading;

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
    maxId,
  ]);

  const showSearchEmpty = isSearching && !searchQuery.isFetching && pokemons.length === 0;
  const showEmpty = !isLoading && !showSearchEmpty && pokemons.length === 0;

  return {
    // filter state
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    regionFilter,
    setRegionFilter,
    sortBy,
    setSortBy,
    showFavorites,
    setShowFavorites,
    // computed data
    pokemons,
    typeOptions,
    isLoading,
    isFetchingNextPage: listQuery.isFetchingNextPage,
    hasNextPage: listQuery.hasNextPage,
    fetchNextPage: listQuery.fetchNextPage,
    showSearchEmpty,
    showEmpty,
    debouncedQuery,
    totalFavorites,
    isFiltered,
    isFavoritesMode,
    isSearching,
  };
}