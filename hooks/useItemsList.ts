import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchItems, PAGE_SIZE } from '@/api/pokemon/fetchers';

export function useItemsList(pockets: string[], search: string) {
   return useInfiniteQuery({
      queryKey: ['items', 'list', pockets, search],
      queryFn: ({ pageParam }) => fetchItems(pageParam as number, pockets, search),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
         if (!lastPage.hasMore) return undefined;
         return (lastPageParam as number) + PAGE_SIZE;
      },
      staleTime: 10 * 60 * 1000,
   });
}
