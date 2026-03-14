import { useQuery } from '@tanstack/react-query';

import { searchPokemon } from '@/api/pokemon/fetchers';

export function usePokemonSearch(query: string) {
   const trimmed = query.trim().toLowerCase();

   return useQuery({
      queryKey: ['pokemon', 'search', trimmed],
      queryFn: () => searchPokemon(trimmed),
      enabled: trimmed.length >= 2,
      staleTime: 1000 * 60 * 5,
   });
}
