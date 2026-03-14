export type PokemonType =
  | 'all'
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water';

export type SortOption = 'number-asc' | 'number-desc' | 'name-asc' | 'name-desc';

export type Region = 'all' | 'kanto' | 'johto' | 'hoenn' | 'sinnoh' | 'unova' | 'kalos' | 'alola' | 'galar' | 'paldea';

export const REGION_OPTIONS: { value: Region; label: string; startId?: number; endId?: number }[] = [
  { value: 'all', label: 'All regions' },
  { value: 'kanto', label: 'Kanto', startId: 1, endId: 151 },
  { value: 'johto', label: 'Johto', startId: 152, endId: 251 },
  { value: 'hoenn', label: 'Hoenn', startId: 252, endId: 386 },
  { value: 'sinnoh', label: 'Sinnoh', startId: 387, endId: 493 },
  { value: 'unova', label: 'Unova', startId: 494, endId: 649 },
  { value: 'kalos', label: 'Kalos', startId: 650, endId: 721 },
  { value: 'alola', label: 'Alola', startId: 722, endId: 809 },
  { value: 'galar', label: 'Galar', startId: 810, endId: 905 },
  { value: 'paldea', label: 'Paldea', startId: 906, endId: 1025 },
];

export const POKEMON_TYPE_OPTIONS: { value: PokemonType; label: string; color?: string; textColor?: string }[] =
  [
    { value: 'all', label: 'All types' },
    { value: 'bug', label: 'Bug', color: '#A9B820', textColor: '#1B1B1B' },
    { value: 'dark', label: 'Dark', color: '#4F3A29' },
    { value: 'dragon', label: 'Dragon', color: '#4F60E2' },
    { value: 'electric', label: 'Electric', color: '#F4D23C', textColor: '#1B1B1B' },
    { value: 'fairy', label: 'Fairy', color: '#EC8FE6', textColor: '#1B1B1B' },
    { value: 'fighting', label: 'Fighting', color: '#C3303A' },
    { value: 'fire', label: 'Fire', color: '#FB6C6C' },
    { value: 'flying', label: 'Flying', color: '#89AAE3' },
    { value: 'ghost', label: 'Ghost', color: '#5F6DBE' },
    { value: 'grass', label: 'Grass', color: '#7BC87E', textColor: '#1B1B1B' },
    { value: 'ground', label: 'Ground', color: '#D97845' },
    { value: 'ice', label: 'Ice', color: '#78D2AF', textColor: '#1B1B1B' },
    { value: 'normal', label: 'Normal', color: '#A0A29F', textColor: '#1B1B1B' },
    { value: 'poison', label: 'Poison', color: '#A668A3' },
    { value: 'psychic', label: 'Psychic', color: '#F67176' },
    { value: 'rock', label: 'Rock', color: '#C9BC8A', textColor: '#1B1B1B' },
    { value: 'steel', label: 'Steel', color: '#5A8FA3' },
    { value: 'water', label: 'Water', color: '#74ACF5' },
  ];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'number-asc', label: 'Lowest number' },
  { value: 'number-desc', label: 'Highest number' },
  { value: 'name-asc', label: 'A–Z' },
  { value: 'name-desc', label: 'Z–A' },
];

export const POKEMON_TYPE_COLORS: Record<string, { bg: string; text: string }> =
  Object.fromEntries(
    POKEMON_TYPE_OPTIONS.filter((o) => o.value !== 'all' && o.color).map((o) => [
      o.value,
      { bg: o.color!, text: o.textColor ?? '#FFFFFF' },
    ])
  );
