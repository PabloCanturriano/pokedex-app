// ── Public normalized types (consumed by hooks and components) ───────────────

export type PokemonListItem = {
  id: number;
  name: string;
};

export type PokemonListPage = {
  results: PokemonListItem[];
  hasMore: boolean;
};

export type Pokemon = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string | null };
};

// ── Internal GQL raw shapes (used only in fetchers) ───────────────────────────

type GqlSprites = {
  front_default: string | null;
  other?: {
    'official-artwork'?: { front_default: string | null };
  };
};

export type GqlPokemon = {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: { name: string };
  }[];
  pokemon_v2_pokemonsprites: { sprites: GqlSprites }[];
};

export function normalizePokemon(raw: GqlPokemon): Pokemon {
  return {
    id: raw.id,
    name: raw.name,
    types: raw.pokemon_v2_pokemontypes.map((t) => ({
      type: { name: t.pokemon_v2_type.name },
    })),
    sprites: {
      front_default: raw.pokemon_v2_pokemonsprites[0]?.sprites?.front_default ?? null,
    },
  };
}
