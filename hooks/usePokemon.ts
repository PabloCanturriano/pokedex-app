import { useQuery } from '@tanstack/react-query';

import {
   fetchPokemon,
   fetchPokemonDetail,
   fetchPokemonsByRegion,
   fetchPokemonsByType,
   fetchPokemonsByTypeAndRegion,
} from '@/api/pokemon/fetchers';
import type { EvolutionChainItem, Pokemon, PokemonDetail, PokemonStat } from '@/api/pokemon/types';
import { POKEMON_TYPE_COLORS, type SortOption } from '@/constants/pokemon';

export type EvolutionChainItemData = EvolutionChainItem & {
   displayName: string;
};

export type PokemonCardData = Pokemon & {
   primaryType: string;
   typeColor: string;
   cardBackground: string;
   displayName: string;
   number: string;
   spriteUrl: string | null;
};

export type PokemonDetailData = {
   id: number;
   name: string;
   height: number;
   weight: number;
   types: { type: { name: string } }[];
   sprites: {
      front_default: string | null;
      front_shiny: string | null;
      officialArtwork: string | null;
      officialArtworkShiny: string | null;
   };
   ability: string | null;
   category: string | null;
   flavorText: string | null;
   stats: PokemonStat[];
   evolutionChain: EvolutionChainItemData[];
   primaryType: string;
   typeColor: string;
   displayName: string;
   number: string;
   spriteUrl: string | null;
   shinyUrl: string | null;
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

export function usePokemonsByRegion(
   minId: number,
   maxId: number,
   sortBy: SortOption = 'number-asc'
) {
   return useQuery({
      queryKey: ['pokemon', 'region', minId, maxId, sortBy],
      queryFn: () => fetchPokemonsByRegion(minId, maxId, sortBy),
      enabled: minId > 0 && maxId > 0,
      staleTime: 1000 * 60 * 10,
   });
}

export function usePokemonsByTypeAndRegion(
   type: string,
   minId: number,
   maxId: number,
   sortBy: SortOption = 'number-asc'
) {
   return useQuery({
      queryKey: ['pokemon', 'type-region', type, minId, maxId, sortBy],
      queryFn: () => fetchPokemonsByTypeAndRegion(type, minId, maxId, sortBy),
      enabled: type !== 'all' && minId > 0 && maxId > 0,
      staleTime: 1000 * 60 * 10,
   });
}

function toPokemonCardData(pokemon: Pokemon): PokemonCardData {
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
}

function toPokemonDetailData(pokemon: PokemonDetail): PokemonDetailData {
   const primaryType = pokemon.types[0]?.type.name ?? 'normal';
   const typeColor = POKEMON_TYPE_COLORS[primaryType]?.bg ?? '#A0A29F';
   return {
      ...pokemon,
      evolutionChain: pokemon.evolutionChain.map((p) => ({
         ...p,
         displayName: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      })),
      primaryType,
      typeColor,
      displayName: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      number: String(pokemon.id).padStart(3, '0'),
      spriteUrl: pokemon.sprites.officialArtwork ?? pokemon.sprites.front_default,
      shinyUrl: pokemon.sprites.officialArtworkShiny ?? pokemon.sprites.front_shiny,
      weightKg: (pokemon.weight / 10).toFixed(1).replace('.', ','),
      heightM: (pokemon.height / 10).toFixed(1).replace('.', ','),
   };
}

export function usePokemon(id: number) {
   const query = useQuery({
      queryKey: ['pokemon', id],
      queryFn: () => fetchPokemon(id),
      staleTime: 1000 * 60 * 10,
   });
   return { ...query, data: query.data ? toPokemonCardData(query.data) : undefined };
}

export function usePokemonDetail(id: number) {
   const query = useQuery({
      queryKey: ['pokemon-detail', id],
      queryFn: () => fetchPokemonDetail(id),
      staleTime: 1000 * 60 * 10,
   });
   return { ...query, data: query.data ? toPokemonDetailData(query.data) : undefined };
}
