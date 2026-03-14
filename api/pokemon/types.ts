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

export type PokemonStat = {
   name: string;
   value: number;
};

export type EvolutionChainItem = {
   id: number;
   name: string;
   spriteUrl: string | null;
};

export type PokemonDetail = {
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
   evolutionChain: EvolutionChainItem[];
};

// ── Item types ────────────────────────────────────────────────────────────────

export type Item = {
   id: number;
   name: string;
   displayName: string;
   cost: number;
   category: string;
   flavorText: string | null;
   spriteUrl: string;
};

export type ItemListPage = {
   results: Item[];
   hasMore: boolean;
};

export type ItemDetail = {
   id: number;
   name: string;
   displayName: string;
   cost: number;
   sellPrice: number;
   category: string;
   flavorText: string | null;
   shortEffect: string | null;
   effect: string | null;
   spriteUrl: string;
};

export type GqlItemDetail = {
   id: number;
   name: string;
   cost: number;
   pokemon_v2_itemnames: { name: string }[];
   pokemon_v2_itemcategory: { name: string } | null;
   pokemon_v2_itemflavortexts: { flavor_text: string }[];
   pokemon_v2_itemeffecttexts: { short_effect: string; effect: string }[];
};

function cleanEffectText(text: string): string {
   return text
      .replace(/\[([^\]]+)\]\{[^}]+\}/g, '$1') // [text]{mechanic:foo} → text
      .replace(/[\n\f\r]/g, ' ')
      .trim();
}

export function normalizeItemDetail(raw: GqlItemDetail): ItemDetail {
   return {
      id: raw.id,
      name: raw.name,
      displayName: raw.pokemon_v2_itemnames[0]?.name ?? raw.name,
      cost: raw.cost,
      sellPrice: Math.floor(raw.cost / 2),
      category: raw.pokemon_v2_itemcategory?.name ?? 'unknown',
      flavorText: raw.pokemon_v2_itemflavortexts[0]?.flavor_text?.replace(/[\n\f\r]/g, ' ') ?? null,
      shortEffect: raw.pokemon_v2_itemeffecttexts[0]?.short_effect
         ? cleanEffectText(raw.pokemon_v2_itemeffecttexts[0].short_effect)
         : null,
      effect: raw.pokemon_v2_itemeffecttexts[0]?.effect
         ? cleanEffectText(raw.pokemon_v2_itemeffecttexts[0].effect)
         : null,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${raw.name}.png`,
   };
}

export type GqlItem = {
   id: number;
   name: string;
   cost: number;
   pokemon_v2_itemnames: { name: string }[];
   pokemon_v2_itemcategory: { name: string } | null;
   pokemon_v2_itemflavortexts: { flavor_text: string }[];
};

export function normalizeItem(raw: GqlItem): Item {
   return {
      id: raw.id,
      name: raw.name,
      displayName: raw.pokemon_v2_itemnames[0]?.name ?? raw.name,
      cost: raw.cost,
      category: raw.pokemon_v2_itemcategory?.name ?? 'unknown',
      flavorText: raw.pokemon_v2_itemflavortexts[0]?.flavor_text?.replace(/[\n\f\r]/g, ' ') ?? null,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${raw.name}.png`,
   };
}

// ── Internal GQL raw shapes (used only in fetchers) ───────────────────────────

type GqlSprites = {
   front_default: string | null;
   front_shiny: string | null;
   other?: {
      'official-artwork'?: { front_default: string | null; front_shiny: string | null };
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
   pokemon_v2_pokemonstats: {
      base_stat: number;
      pokemon_v2_stat: { name: string };
   }[];
   pokemon_v2_pokemonspecy: {
      pokemon_v2_pokemonspeciesnames: { genus: string }[];
      pokemon_v2_pokemonspeciesflavortexts: { flavor_text: string }[];
      pokemon_v2_evolutionchain: {
         pokemon_v2_pokemonspecies: {
            id: number;
            name: string;
            pokemon_v2_pokemons: {
               id: number;
               pokemon_v2_pokemonsprites: { sprites: GqlSprites }[];
            }[];
         }[];
      } | null;
   } | null;
};

export function normalizePokemonDetail(raw: GqlPokemonDetail): PokemonDetail {
   const abilityEntry = raw.pokemon_v2_pokemonabilities[0];
   const ability =
      abilityEntry?.pokemon_v2_ability.pokemon_v2_abilitynames[0]?.name ??
      abilityEntry?.pokemon_v2_ability.name ??
      null;

   const evolutionChain =
      raw.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies.map(
         (species) => {
            const pokemon = species.pokemon_v2_pokemons[0];
            const sprites = pokemon?.pokemon_v2_pokemonsprites[0]?.sprites;
            const spriteUrl =
               sprites?.other?.['official-artwork']?.front_default ??
               sprites?.front_default ??
               null;

            return {
               id: pokemon?.id ?? species.id,
               name: species.name,
               spriteUrl,
            };
         }
      ) ?? [];

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
         front_shiny: raw.pokemon_v2_pokemonsprites[0]?.sprites?.front_shiny ?? null,
         officialArtwork:
            raw.pokemon_v2_pokemonsprites[0]?.sprites?.other?.['official-artwork']?.front_default ??
            null,
         officialArtworkShiny:
            raw.pokemon_v2_pokemonsprites[0]?.sprites?.other?.['official-artwork']?.front_shiny ??
            null,
      },
      ability,
      stats: raw.pokemon_v2_pokemonstats.map((s) => ({
         name: s.pokemon_v2_stat.name,
         value: s.base_stat,
      })),
      category: raw.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0]?.genus ?? null,
      flavorText:
         raw.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text?.replace(
            /[\n\f\r]/g,
            ' '
         ) ?? null,
      evolutionChain,
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
