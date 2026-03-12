import {useQuery} from '@tanstack/react-query';

import {fetchPokemon, fetchPokemonsByType} from '@/api/pokemon/fetchers';
import type {PokemonType} from '@/constants/pokemon';

export function usePokemonsByType(type: Exclude<PokemonType, 'all'>) {
  return useQuery({
    queryKey: ['pokemon', 'type', type],
    queryFn: () => fetchPokemonsByType(type),
    staleTime: 1000 * 60 * 10
  });
}

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
    staleTime: 1000 * 60 * 10,
  });
}
