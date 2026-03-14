import type { DrawerSelectOption } from '@/components/molecules/drawer-select';
import { POKEMON_TYPE_OPTIONS, type PokemonType } from '@/constants/pokemon';

export function usePokemonTypes(): { data: DrawerSelectOption<PokemonType>[] } {
   return { data: POKEMON_TYPE_OPTIONS };
}
