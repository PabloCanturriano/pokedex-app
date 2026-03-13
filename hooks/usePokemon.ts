import {useQuery} from '@tanstack/react-query';

import {fetchPokemon, fetchPokemonsByType} from '@/api/pokemon/fetchers';
import type {SortOption} from '@/constants/pokemon';

export function usePokemonsByType(type: string, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'type', type, sortBy],
    queryFn: () => fetchPokemonsByType(type, sortBy),
    enabled: type !== 'all',
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
