import { useInfiniteQuery } from '@tanstack/react-query';

import { PAGE_SIZE, fetchPokemonList } from '@/api/pokemon/fetchers';
import type { SortOption } from '@/constants/pokemon';

export function usePokemonList(sortBy: SortOption = 'number-asc') {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list', sortBy],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number, sortBy),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.hasMore) return undefined;
      return (lastPageParam as number) + PAGE_SIZE;
    },
  });
}
