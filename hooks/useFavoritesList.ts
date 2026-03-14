import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchFavorites } from '@/api/pokemon/fetchers';
import type { PokemonType, SortOption } from '@/constants/pokemon';
import { useFavoritesStore } from '@/store/useFavoritesStore';

export function useFavoritesList(enabled: boolean, sortBy: SortOption, typeFilter: PokemonType) {
   // Select the items array directly — Zustand returns the same reference if unchanged,
   // so this selector is stable. Mapping inside the selector would create a new array
   // every render and trigger React's getSnapshot infinite loop.
   const items = useFavoritesStore((s) => s.items);
   const ids = useMemo(() => items.map((i) => i.id), [items]);

   return useQuery({
      queryKey: ['favorites', ids, sortBy, typeFilter],
      queryFn: () => fetchFavorites(ids, sortBy, typeFilter),
      enabled: enabled && ids.length > 0,
      staleTime: 1000 * 60 * 5,
   });
}
