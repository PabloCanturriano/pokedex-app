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

export type Region =
   | 'all'
   | 'kanto'
   | 'johto'
   | 'hoenn'
   | 'sinnoh'
   | 'unova'
   | 'kalos'
   | 'alola'
   | 'galar'
   | 'paldea';

export const REGION_OPTIONS: { value: Region; label: string; startId?: number; endId?: number }[] =
   [
      { value: 'all', label: 'regions.all' },
      { value: 'kanto', label: 'regions.kanto', startId: 1, endId: 151 },
      { value: 'johto', label: 'regions.johto', startId: 152, endId: 251 },
      { value: 'hoenn', label: 'regions.hoenn', startId: 252, endId: 386 },
      { value: 'sinnoh', label: 'regions.sinnoh', startId: 387, endId: 493 },
      { value: 'unova', label: 'regions.unova', startId: 494, endId: 649 },
      { value: 'kalos', label: 'regions.kalos', startId: 650, endId: 721 },
      { value: 'alola', label: 'regions.alola', startId: 722, endId: 809 },
      { value: 'galar', label: 'regions.galar', startId: 810, endId: 905 },
      { value: 'paldea', label: 'regions.paldea', startId: 906, endId: 1025 },
   ];

export const POKEMON_TYPE_OPTIONS: {
   value: PokemonType;
   label: string;
   color?: string;
   textColor?: string;
}[] = [
   { value: 'all', label: 'types.all' },
   { value: 'bug', label: 'types.bug', color: '#A9B820', textColor: '#1B1B1B' },
   { value: 'dark', label: 'types.dark', color: '#4F3A29' },
   { value: 'dragon', label: 'types.dragon', color: '#4F60E2' },
   { value: 'electric', label: 'types.electric', color: '#F4D23C', textColor: '#1B1B1B' },
   { value: 'fairy', label: 'types.fairy', color: '#EC8FE6', textColor: '#1B1B1B' },
   { value: 'fighting', label: 'types.fighting', color: '#C3303A' },
   { value: 'fire', label: 'types.fire', color: '#FB6C6C' },
   { value: 'flying', label: 'types.flying', color: '#89AAE3' },
   { value: 'ghost', label: 'types.ghost', color: '#5F6DBE' },
   { value: 'grass', label: 'types.grass', color: '#7BC87E', textColor: '#1B1B1B' },
   { value: 'ground', label: 'types.ground', color: '#D97845' },
   { value: 'ice', label: 'types.ice', color: '#78D2AF', textColor: '#1B1B1B' },
   { value: 'normal', label: 'types.normal', color: '#A0A29F', textColor: '#1B1B1B' },
   { value: 'poison', label: 'types.poison', color: '#A668A3' },
   { value: 'psychic', label: 'types.psychic', color: '#F67176' },
   { value: 'rock', label: 'types.rock', color: '#C9BC8A', textColor: '#1B1B1B' },
   { value: 'steel', label: 'types.steel', color: '#5A8FA3' },
   { value: 'water', label: 'types.water', color: '#74ACF5' },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
   { value: 'number-asc', label: 'sort.numberAsc' },
   { value: 'number-desc', label: 'sort.numberDesc' },
   { value: 'name-asc', label: 'sort.nameAsc' },
   { value: 'name-desc', label: 'sort.nameDesc' },
];

export const POKEMON_TYPE_COLORS: Record<string, { bg: string; text: string }> = Object.fromEntries(
   POKEMON_TYPE_OPTIONS.filter((o) => o.value !== 'all' && o.color).map((o) => [
      o.value,
      { bg: o.color!, text: o.textColor ?? '#FFFFFF' },
   ])
);
