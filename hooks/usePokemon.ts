import {useQuery} from '@tanstack/react-query';

import {fetchPokemon, fetchPokemonsByRegion, fetchPokemonsByType, fetchPokemonsByTypeAndRegion} from '@/api/pokemon/fetchers';
import type {SortOption} from '@/constants/pokemon';

export function usePokemonsByType(type: string, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'type', type, sortBy],
    queryFn: () => fetchPokemonsByType(type, sortBy),
    enabled: type !== 'all',
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemonsByRegion(minId: number, maxId: number, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'region', minId, maxId, sortBy],
    queryFn: () => fetchPokemonsByRegion(minId, maxId, sortBy),
    enabled: minId > 0 && maxId > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemonsByTypeAndRegion(type: string, minId: number, maxId: number, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'type-region', type, minId, maxId, sortBy],
    queryFn: () => fetchPokemonsByTypeAndRegion(type, minId, maxId, sortBy),
    enabled: type !== 'all' && minId > 0 && maxId > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemon(id: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
    staleTime: 1000 * 60 * 10,
  });
}
