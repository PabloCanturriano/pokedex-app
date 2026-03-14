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

