import {
   type GqlItem,
   type GqlItemDetail,
   type GqlPokemon,
   type GqlPokemonDetail,
   normalizeItem,
   normalizeItemDetail,
   normalizePokemon,
   normalizePokemonDetail,
} from '../types';

describe('normalizeItem', () => {
   const base: GqlItem = {
      id: 1,
      name: 'master-ball',
      cost: 0,
      pokemon_v2_itemnames: [{ name: 'Master Ball' }],
      pokemon_v2_itemcategory: { name: 'standard-balls' },
      pokemon_v2_itemflavortexts: [{ flavor_text: 'The best ball.\nCatches any Pokémon.' }],
   };

   it('maps basic fields', () => {
      const item = normalizeItem(base);
      expect(item.id).toBe(1);
      expect(item.name).toBe('master-ball');
      expect(item.cost).toBe(0);
   });

   it('uses the first display name', () => {
      expect(normalizeItem(base).displayName).toBe('Master Ball');
   });

   it('falls back to raw name when no display name', () => {
      const item = normalizeItem({ ...base, pokemon_v2_itemnames: [] });
      expect(item.displayName).toBe('master-ball');
   });

   it('uses category name', () => {
      expect(normalizeItem(base).category).toBe('standard-balls');
   });

   it('falls back to "unknown" when no category', () => {
      const item = normalizeItem({ ...base, pokemon_v2_itemcategory: null });
      expect(item.category).toBe('unknown');
   });

   it('collapses newlines in flavor text', () => {
      const item = normalizeItem(base);
      expect(item.flavorText).toBe('The best ball. Catches any Pokémon.');
   });

   it('returns null flavor text when none available', () => {
      const item = normalizeItem({ ...base, pokemon_v2_itemflavortexts: [] });
      expect(item.flavorText).toBeNull();
   });

   it('builds the sprite URL from item name', () => {
      expect(normalizeItem(base).spriteUrl).toBe(
         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'
      );
   });
});

describe('normalizeItemDetail', () => {
   const base: GqlItemDetail = {
      id: 5,
      name: 'focus-band',
      cost: 100,
      pokemon_v2_itemnames: [{ name: 'Focus Band' }],
      pokemon_v2_itemcategory: { name: 'held-items' },
      pokemon_v2_itemflavortexts: [{ flavor_text: 'An item to be held.' }],
      pokemon_v2_itemeffecttexts: [
         {
            short_effect: 'May prevent fainting [once]{mechanic:focus-band}.',
            effect: 'Held: Has a 10% [chance]{mechanic:chance} to prevent fainting.',
         },
      ],
   };

   it('computes sell price as half of cost', () => {
      expect(normalizeItemDetail(base).sellPrice).toBe(50);
   });

   it('floors sell price', () => {
      const item = normalizeItemDetail({ ...base, cost: 101 });
      expect(item.sellPrice).toBe(50);
   });

   it('cleans PokéAPI markup from short_effect', () => {
      expect(normalizeItemDetail(base).shortEffect).toBe('May prevent fainting once.');
   });

   it('cleans PokéAPI markup from effect', () => {
      expect(normalizeItemDetail(base).effect).toBe('Held: Has a 10% chance to prevent fainting.');
   });

   it('returns null effect when none available', () => {
      const item = normalizeItemDetail({ ...base, pokemon_v2_itemeffecttexts: [] });
      expect(item.shortEffect).toBeNull();
      expect(item.effect).toBeNull();
   });
});

describe('normalizePokemon', () => {
   const base: GqlPokemon = {
      id: 25,
      name: 'pikachu',
      pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: 'electric' } }],
      pokemon_v2_pokemonsprites: [
         {
            sprites: {
               front_default: 'https://example.com/pikachu.png',
               front_shiny: null,
            },
         },
      ],
   };

   it('maps id and name', () => {
      const p = normalizePokemon(base);
      expect(p.id).toBe(25);
      expect(p.name).toBe('pikachu');
   });

   it('maps types', () => {
      const p = normalizePokemon(base);
      expect(p.types).toEqual([{ type: { name: 'electric' } }]);
   });

   it('maps front_default sprite', () => {
      expect(normalizePokemon(base).sprites.front_default).toBe('https://example.com/pikachu.png');
   });

   it('returns null sprite when none available', () => {
      const p = normalizePokemon({ ...base, pokemon_v2_pokemonsprites: [] });
      expect(p.sprites.front_default).toBeNull();
   });
});

describe('normalizePokemonDetail', () => {
   const base: GqlPokemonDetail = {
      id: 6,
      name: 'charizard',
      height: 17,
      weight: 905,
      pokemon_v2_pokemontypes: [
         { pokemon_v2_type: { name: 'fire' } },
         { pokemon_v2_type: { name: 'flying' } },
      ],
      pokemon_v2_pokemonsprites: [
         {
            sprites: {
               front_default: 'https://example.com/charizard.png',
               front_shiny: 'https://example.com/charizard-shiny.png',
               other: {
                  'official-artwork': {
                     front_default: 'https://example.com/charizard-artwork.png',
                     front_shiny: 'https://example.com/charizard-artwork-shiny.png',
                  },
               },
            },
         },
      ],
      pokemon_v2_pokemonabilities: [
         {
            pokemon_v2_ability: {
               name: 'blaze',
               pokemon_v2_abilitynames: [{ name: 'Blaze' }],
            },
         },
      ],
      pokemon_v2_pokemonstats: [
         { base_stat: 78, pokemon_v2_stat: { name: 'hp' } },
         { base_stat: 84, pokemon_v2_stat: { name: 'attack' } },
      ],
      pokemon_v2_pokemonspecy: {
         pokemon_v2_pokemonspeciesnames: [{ genus: 'Flame Pokémon' }],
         pokemon_v2_pokemonspeciesflavortexts: [{ flavor_text: 'Spits fire\nthat is hot enough.' }],
         pokemon_v2_evolutionchain: {
            pokemon_v2_pokemonspecies: [
               {
                  id: 4,
                  name: 'charmander',
                  pokemon_v2_pokemons: [
                     {
                        id: 4,
                        pokemon_v2_pokemonsprites: [
                           { sprites: { front_default: 'charm.png', front_shiny: null } },
                        ],
                     },
                  ],
               },
            ],
         },
      },
   };

   it('maps height and weight', () => {
      const p = normalizePokemonDetail(base);
      expect(p.height).toBe(17);
      expect(p.weight).toBe(905);
   });

   it('maps types correctly', () => {
      const p = normalizePokemonDetail(base);
      expect(p.types).toEqual([{ type: { name: 'fire' } }, { type: { name: 'flying' } }]);
   });

   it('maps official artwork sprites', () => {
      const p = normalizePokemonDetail(base);
      expect(p.sprites.officialArtwork).toBe('https://example.com/charizard-artwork.png');
      expect(p.sprites.officialArtworkShiny).toBe(
         'https://example.com/charizard-artwork-shiny.png'
      );
   });

   it('uses localized ability name', () => {
      expect(normalizePokemonDetail(base).ability).toBe('Blaze');
   });

   it('falls back to raw ability name when no localization', () => {
      const raw: GqlPokemonDetail = {
         ...base,
         pokemon_v2_pokemonabilities: [
            {
               pokemon_v2_ability: {
                  name: 'blaze',
                  pokemon_v2_abilitynames: [],
               },
            },
         ],
      };
      expect(normalizePokemonDetail(raw).ability).toBe('blaze');
   });

   it('maps stats', () => {
      const p = normalizePokemonDetail(base);
      expect(p.stats).toEqual([
         { name: 'hp', value: 78 },
         { name: 'attack', value: 84 },
      ]);
   });

   it('maps category (genus)', () => {
      expect(normalizePokemonDetail(base).category).toBe('Flame Pokémon');
   });

   it('collapses newlines in flavor text', () => {
      expect(normalizePokemonDetail(base).flavorText).toBe('Spits fire that is hot enough.');
   });

   it('maps evolution chain', () => {
      const p = normalizePokemonDetail(base);
      expect(p.evolutionChain).toHaveLength(1);
      expect(p.evolutionChain[0]).toMatchObject({ id: 4, name: 'charmander' });
   });

   it('returns empty evolution chain when none present', () => {
      const raw: GqlPokemonDetail = {
         ...base,
         pokemon_v2_pokemonspecy: {
            ...base.pokemon_v2_pokemonspecy!,
            pokemon_v2_evolutionchain: null,
         },
      };
      expect(normalizePokemonDetail(raw).evolutionChain).toEqual([]);
   });
});
