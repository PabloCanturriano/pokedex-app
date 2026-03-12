import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPokemonList } from '@/api/pokemon/fetchers';

const PAGE_SIZE = 20;

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.next) return undefined;
      return (lastPageParam as number) + PAGE_SIZE;
    },
  });
}
