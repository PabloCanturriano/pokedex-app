import { useQuery } from '@tanstack/react-query';

import { fetchItemDetail } from '@/api/pokemon/fetchers';

export function useItemDetail(id: number) {
   return useQuery({
      queryKey: ['item', 'detail', id],
      queryFn: () => fetchItemDetail(id),
      staleTime: 10 * 60 * 1000,
   });
}
