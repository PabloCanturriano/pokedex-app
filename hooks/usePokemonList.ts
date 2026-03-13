import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchPokemonCount, fetchPokemonList } from '@/api/pokemon/fetchers';

const PAGE_SIZE = 20;

export function usePokemonList(sortBy: 'number-asc' | 'number-desc' = 'number-asc') {
  const isDesc = sortBy === 'number-desc';

  // For descending order we need the total count to find the starting offset.
  // This query is cheap (limit=1) and cached forever.
  const { data: totalCount } = useQuery({
    queryKey: ['pokemon', 'count'],
    queryFn: fetchPokemonCount,
    enabled: isDesc,
    staleTime: Infinity,
  });

  return useInfiniteQuery({
    queryKey: ['pokemon', 'list', sortBy],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number),
    // For desc: wait until totalCount is known so initialPageParam is correct.
    // For asc: always enabled.
    enabled: !isDesc || totalCount !== undefined,
    initialPageParam: isDesc ? Math.max(0, (totalCount ?? 0) - PAGE_SIZE) : 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const offset = lastPageParam as number;
      if (isDesc) {
        if (offset <= 0) return undefined;
        return Math.max(0, offset - PAGE_SIZE);
      }
      if (!lastPage.next) return undefined;
      return offset + PAGE_SIZE;
    },
  });
}
