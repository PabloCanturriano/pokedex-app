import { apiClient } from '@/api/client';

import type { Pokemon, PokemonListResponse, PokemonTypeResponse } from './types';

const PAGE_SIZE = 20;

export async function fetchPokemonList(offset: number): Promise<PokemonListResponse> {
  const { data } = await apiClient.get<PokemonListResponse>('/pokemon', {
    params: { limit: PAGE_SIZE, offset },
  });
  return data;
}

export async function fetchPokemon(nameOrId: string | number): Promise<Pokemon> {
  const { data } = await apiClient.get<Pokemon>(`/pokemon/${nameOrId}`);
  return data;
}

export async function fetchPokemonsByType(type: string): Promise<PokemonTypeResponse> {
  const { data } = await apiClient.get<PokemonTypeResponse>(`/type/${type}`);
  return data;
}
