import {gqlQuery} from '@/api/graphql-client';
import {
    GET_FAVORITES,
    GET_FAVORITES_BY_TYPE,
    GET_POKEMON,
    GET_POKEMON_BY_REGION,
    GET_POKEMON_BY_TYPE,
    GET_POKEMON_BY_TYPE_AND_REGION,
    GET_POKEMON_DETAIL,
    GET_POKEMON_LIST,
    SEARCH_POKEMON,
} from '@/api/pokemon/queries';
import {
    type GqlPokemon,
    type GqlPokemonDetail,
    normalizePokemon,
    normalizePokemonDetail,
    type Pokemon,
    type PokemonDetail,
    type PokemonListItem,
    type PokemonListPage,
} from '@/api/pokemon/types';
import type {SortOption} from '@/constants/pokemon';

export const PAGE_SIZE = 20;

type OrderBy = { id: 'asc' | 'desc' } | { name: 'asc' | 'desc' };

function toOrderBy(sortBy: SortOption): OrderBy {
  switch (sortBy) {
    case 'number-asc':  return { id: 'asc' };
    case 'number-desc': return { id: 'desc' };
    case 'name-asc':    return { name: 'asc' };
    case 'name-desc':   return { name: 'desc' };
  }
}

export async function fetchPokemonList(offset: number, sortBy: SortOption = 'number-asc'): Promise<PokemonListPage> {
  const data = await gqlQuery<{ pokemon_v2_pokemon: { id: number; name: string }[] }>(
    GET_POKEMON_LIST,
    { limit: PAGE_SIZE, offset, orderBy: toOrderBy(sortBy) },
  );
  const results = data.pokemon_v2_pokemon.map((p) => ({ id: p.id, name: p.name }));
  return { results, hasMore: results.length === PAGE_SIZE };
}


export async function fetchPokemon(id: number): Promise<Pokemon> {
  const data = await gqlQuery<{ pokemon_v2_pokemon_by_pk: GqlPokemon | null }>(
    GET_POKEMON,
    { id },
  );
  if (!data.pokemon_v2_pokemon_by_pk) throw new Error(`Pokémon #${id} not found`);
  return normalizePokemon(data.pokemon_v2_pokemon_by_pk);
}

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  const data = await gqlQuery<{ pokemon_v2_pokemon_by_pk: GqlPokemonDetail | null }>(
    GET_POKEMON_DETAIL,
    { id },
  );
  if (!data.pokemon_v2_pokemon_by_pk) throw new Error(`Pokémon #${id} not found`);
  return normalizePokemonDetail(data.pokemon_v2_pokemon_by_pk);
}

export async function fetchPokemonsByType(type: string, sortBy: SortOption = 'number-asc'): Promise<PokemonListItem[]> {
  const data = await gqlQuery<{ pokemon_v2_pokemon: { id: number; name: string }[] }>(
    GET_POKEMON_BY_TYPE,
    { type, orderBy: toOrderBy(sortBy) },
  );
  return data.pokemon_v2_pokemon.map((p) => ({ id: p.id, name: p.name }));
}

export async function fetchPokemonsByRegion(minId: number, maxId: number, sortBy: SortOption = 'number-asc'): Promise<PokemonListItem[]> {
  const data = await gqlQuery<{ pokemon_v2_pokemon: { id: number; name: string }[] }>(
    GET_POKEMON_BY_REGION,
    { minId, maxId, orderBy: toOrderBy(sortBy) },
  );
  return data.pokemon_v2_pokemon.map((p) => ({ id: p.id, name: p.name }));
}

export async function fetchPokemonsByTypeAndRegion(type: string, minId: number, maxId: number, sortBy: SortOption = 'number-asc'): Promise<PokemonListItem[]> {
  const data = await gqlQuery<{ pokemon_v2_pokemon: { id: number; name: string }[] }>(
    GET_POKEMON_BY_TYPE_AND_REGION,
    { type, minId, maxId, orderBy: toOrderBy(sortBy) },
  );
  return data.pokemon_v2_pokemon.map((p) => ({ id: p.id, name: p.name }));
}

export async function searchPokemon(query: string): Promise<PokemonListItem[]> {
  const data = await gqlQuery<{ pokemon_v2_pokemon: { id: number; name: string }[] }>(
    SEARCH_POKEMON,
    { search: `%${query}%` },
  );
  return data.pokemon_v2_pokemon.map((p) => ({ id: p.id, name: p.name }));
}
export async function fetchFavorites(
  ids: number[],
  sortBy: SortOption,
  typeFilter: string = 'all',
): Promise<PokemonListItem[]> {
  if (ids.length === 0) return [];
  const orderBy = toOrderBy(sortBy);
  const query = typeFilter === 'all' ? GET_FAVORITES : GET_FAVORITES_BY_TYPE;
  const variables =
    typeFilter === 'all'
      ? { ids, orderBy }
      : { ids, type: typeFilter, orderBy };
  const data = await gqlQuery<{ pokemon_v2_pokemon: { id: number; name: string }[] }>(
    query,
    variables,
  );
  return data.pokemon_v2_pokemon.map((p) => ({ id: p.id, name: p.name }));
}