import {useQuery} from '@tanstack/react-query';

import {fetchPokemon, fetchPokemonsByType} from '@/api/pokemon/fetchers';

export function usePokemonsByType(type: string) {
  return useQuery({
    queryKey: ['pokemon', 'type', type],
    queryFn: () => fetchPokemonsByType(type),
    enabled: type !== 'all',
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
    staleTime: 1000 * 60 * 10,
  });
}
