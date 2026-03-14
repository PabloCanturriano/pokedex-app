import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchItems, PAGE_SIZE } from '@/api/pokemon/fetchers';

export function useItemsList() {
  return useInfiniteQuery({
    queryKey: ['items', 'list'],
    queryFn: ({ pageParam }) => fetchItems(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.hasMore) return undefined;
      return (lastPageParam as number) + PAGE_SIZE;
    },
    staleTime: 10 * 60 * 1000,
  });
}