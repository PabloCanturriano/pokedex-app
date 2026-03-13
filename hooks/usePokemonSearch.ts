import { useQuery } from '@tanstack/react-query';

import { fetchPokemon } from '@/api/pokemon/fetchers';

export function usePokemonSearch(query: string) {
  const trimmed = query.trim().toLowerCase();

  return useQuery({
    queryKey: ['pokemon', 'search', trimmed],
    queryFn: () => fetchPokemon(trimmed),
    enabled: trimmed.length >= 2,
    retry: false, // 404 = no result, don't retry
    staleTime: 1000 * 60 * 10,
  });
}
