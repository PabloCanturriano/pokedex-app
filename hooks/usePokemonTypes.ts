import { useQuery } from '@tanstack/react-query';

import { fetchPokemonTypes } from '@/api/pokemon/fetchers';
import { POKEMON_TYPE_COLORS, POKEMON_TYPE_OPTIONS } from '@/constants/pokemon';
import type { DrawerSelectOption } from '@/components/atoms/drawer-select';
import type { PokemonType } from '@/constants/pokemon';

// The "All types" option always stays first
const ALL_OPTION = POKEMON_TYPE_OPTIONS[0];

export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemon-types'],
    queryFn: fetchPokemonTypes,
    staleTime: Infinity, // type list never changes
    select: (data): DrawerSelectOption<PokemonType>[] => {
      const apiTypes = data.results
        // Filter to only types we have assets for (excludes "unknown" and "shadow")
        .filter((t) => POKEMON_TYPE_COLORS[t.name])
        .map((t) => {
          // Reuse the existing option (label + colors) if available
          const local = POKEMON_TYPE_OPTIONS.find((o) => o.value === t.name);
          return (
            local ?? {
              value: t.name as PokemonType,
              label: t.name.charAt(0).toUpperCase() + t.name.slice(1),
            }
          );
        });

      return [ALL_OPTION, ...apiTypes];
    },
  });
}
