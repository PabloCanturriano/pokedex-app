// ── List endpoint ────────────────────────────────────────────────────────────

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

// ── Single Pokémon ────────────────────────────────────────────────────────────

export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
    home: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
};

// ── Type endpoint ─────────────────────────────────────────────────────────────

export type PokemonTypeEntry = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

export type PokemonTypeResponse = {
  id: number;
  name: string;
  pokemon: PokemonTypeEntry[];
};

// ── Type list endpoint ────────────────────────────────────────────────────────

export type TypeListItem = {
  name: string;
  url: string;
};

export type TypeListResponse = {
  count: number;
  results: TypeListItem[];
};
