import {useQuery} from '@tanstack/react-query';

import {fetchPokemon, fetchPokemonDetail, fetchPokemonsByRegion, fetchPokemonsByType, fetchPokemonsByTypeAndRegion} from '@/api/pokemon/fetchers';
import type {Pokemon, PokemonDetail} from '@/api/pokemon/types';
import {POKEMON_TYPE_COLORS, type SortOption} from '@/constants/pokemon';

export type PokemonCardData = Pokemon & {
  primaryType: string;
  typeColor: string;
  cardBackground: string;
  displayName: string;
  number: string;
  spriteUrl: string | null;
};

export type PokemonDetailData = PokemonDetail & {
  primaryType: string;
  typeColor: string;
  displayName: string;
  number: string;
  spriteUrl: string | null;
  weightKg: string;
  heightM: string;
};

export function usePokemonsByType(type: string, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'type', type, sortBy],
    queryFn: () => fetchPokemonsByType(type, sortBy),
    enabled: type !== 'all',
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemonsByRegion(minId: number, maxId: number, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'region', minId, maxId, sortBy],
    queryFn: () => fetchPokemonsByRegion(minId, maxId, sortBy),
    enabled: minId > 0 && maxId > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemonsByTypeAndRegion(type: string, minId: number, maxId: number, sortBy: SortOption = 'number-asc') {
  return useQuery({
    queryKey: ['pokemon', 'type-region', type, minId, maxId, sortBy],
    queryFn: () => fetchPokemonsByTypeAndRegion(type, minId, maxId, sortBy),
    enabled: type !== 'all' && minId > 0 && maxId > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function usePokemon(id: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
    staleTime: 1000 * 60 * 10,
    select: (pokemon): PokemonCardData => {
      const primaryType = pokemon.types[0]?.type.name ?? 'normal';
      const typeColor = POKEMON_TYPE_COLORS[primaryType]?.bg ?? '#A0A29F';
      return {
        ...pokemon,
        primaryType,
        typeColor,
        cardBackground: `${typeColor}40`,
        displayName: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        number: String(pokemon.id).padStart(3, '0'),
        spriteUrl: pokemon.sprites.front_default,
      };
    },
  });
}

export function usePokemonDetail(id: number) {
  return useQuery({
    queryKey: ['pokemon-detail', id],
    queryFn: () => fetchPokemonDetail(id),
    staleTime: 1000 * 60 * 10,
    select: (pokemon): PokemonDetailData => {
      const primaryType = pokemon.types[0]?.type.name ?? 'normal';
      const typeColor = POKEMON_TYPE_COLORS[primaryType]?.bg ?? '#A0A29F';
      return {
        ...pokemon,
        primaryType,
        typeColor,
        displayName: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        number: String(pokemon.id).padStart(3, '0'),
        spriteUrl: pokemon.sprites.officialArtwork ?? pokemon.sprites.front_default,
        weightKg: (pokemon.weight / 10).toFixed(1).replace('.', ','),
        heightM: (pokemon.height / 10).toFixed(1).replace('.', ','),
      };
    },
  });
}
