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

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string | null; officialArtwork: string | null };
  ability: string | null;
  category: string | null;
  flavorText: string | null;
};

// ── Internal GQL raw shapes (used only in fetchers) ───────────────────────────

type GqlSprites = {
  front_default: string | null;
  other?: {
    'official-artwork'?: { front_default: string | null };
  };
};

export type GqlPokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
  pokemon_v2_pokemonsprites: { sprites: GqlSprites }[];
  pokemon_v2_pokemonabilities: {
    pokemon_v2_ability: {
      name: string;
      pokemon_v2_abilitynames: { name: string }[];
    };
  }[];
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesnames: { genus: string }[];
    pokemon_v2_pokemonspeciesflavortexts: { flavor_text: string }[];
  } | null;
};

export function normalizePokemonDetail(raw: GqlPokemonDetail): PokemonDetail {
  const abilityEntry = raw.pokemon_v2_pokemonabilities[0];
  const ability =
    abilityEntry?.pokemon_v2_ability.pokemon_v2_abilitynames[0]?.name ??
    abilityEntry?.pokemon_v2_ability.name ??
    null;

  return {
    id: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    types: raw.pokemon_v2_pokemontypes.map((t) => ({
      type: { name: t.pokemon_v2_type.name },
    })),
    sprites: {
      front_default: raw.pokemon_v2_pokemonsprites[0]?.sprites?.front_default ?? null,
      officialArtwork:
        raw.pokemon_v2_pokemonsprites[0]?.sprites?.other?.['official-artwork']?.front_default ?? null,
    },
    ability,
    category: raw.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0]?.genus ?? null,
    flavorText:
      raw.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text?.replace(/[\n\f\r]/g, ' ') ?? null,
  };
}

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
