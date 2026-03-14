export const GET_POKEMON_LIST = `
  query GetPokemonList($limit: Int!, $offset: Int!, $orderBy: [pokemon_v2_pokemon_order_by!]!) {
    pokemon_v2_pokemon(
      where: { is_default: { _eq: true } }
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) {
      id
      name
    }
  }
`;

export const GET_POKEMON = `
  query GetPokemon($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMON_BY_TYPE = `
  query GetPokemonByType($type: String!, $orderBy: [pokemon_v2_pokemon_order_by!]!) {
    pokemon_v2_pokemon(
      where: {
        is_default: { _eq: true }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: $type } }
        }
      }
      order_by: $orderBy
    ) {
      id
      name
    }
  }
`;

export const SEARCH_POKEMON = `
  query SearchPokemon($search: String!) {
    pokemon_v2_pokemon(
      where: {
        is_default: { _eq: true }
        name: { _ilike: $search }
      }
      limit: 20
      order_by: { id: asc }
    ) {
      id
      name
    }
  }
`;

export const GET_FAVORITES = `
  query GetFavorites($ids: [Int!]!, $orderBy: [pokemon_v2_pokemon_order_by!]!) {
    pokemon_v2_pokemon(
      where: {
        id: { _in: $ids }
        is_default: { _eq: true }
      }
      order_by: $orderBy
    ) {
      id
      name
    }
  }
`;

export const GET_FAVORITES_BY_TYPE = `
  query GetFavoritesByType($ids: [Int!]!, $type: String!, $orderBy: [pokemon_v2_pokemon_order_by!]!) {
    pokemon_v2_pokemon(
      where: {
        id: { _in: $ids }
        is_default: { _eq: true }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: $type } }
        }
      }
      order_by: $orderBy
    ) {
      id
      name
    }
  }
`;

export const GET_POKEMON_BY_REGION = `
  query GetPokemonByRegion($minId: Int!, $maxId: Int!, $orderBy: [pokemon_v2_pokemon_order_by!]!) {
    pokemon_v2_pokemon(
      where: {
        is_default: { _eq: true }
        id: { _gte: $minId, _lte: $maxId }
      }
      order_by: $orderBy
    ) {
      id
      name
    }
  }
`;

export const GET_POKEMON_DETAIL = `
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonabilities(
        where: { is_hidden: { _eq: false } }
        limit: 1
        order_by: { slot: asc }
      ) {
        pokemon_v2_ability {
          name
          pokemon_v2_abilitynames(where: { language_id: { _eq: 9 } }, limit: 1) {
            name
          }
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat { name }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 9 } }, limit: 1) {
          genus
        }
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
          limit: 1
          order_by: { version_id: asc }
        ) {
          flavor_text
        }
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies(order_by: { id: asc }) {
            id
            name
            pokemon_v2_pokemons(where: { is_default: { _eq: true } }, limit: 1) {
              id
              pokemon_v2_pokemonsprites(limit: 1) {
                sprites
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_TYPE_AND_REGION = `
  query GetPokemonByTypeAndRegion($type: String!, $minId: Int!, $maxId: Int!, $orderBy: [pokemon_v2_pokemon_order_by!]!) {
    pokemon_v2_pokemon(
      where: {
        is_default: { _eq: true }
        id: { _gte: $minId, _lte: $maxId }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: $type } }
        }
      }
      order_by: $orderBy
    ) {
      id
      name
    }
  }
`;
