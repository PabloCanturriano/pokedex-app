export type ItemTab = 'pokeballs' | 'berries' | 'machines' | 'training';

export const ITEM_TABS: { value: ItemTab; label: string; pockets: string[] }[] = [
  { value: 'pokeballs', label: 'Pokeballs', pockets: ['pokeballs'] },
  { value: 'berries', label: 'Berries', pockets: ['berries'] },
  { value: 'machines', label: 'MT & MO', pockets: ['machines'] },
  { value: 'training', label: 'Training', pockets: ['battle', 'misc'] },
];
