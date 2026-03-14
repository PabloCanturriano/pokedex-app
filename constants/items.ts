export type ItemTab = 'pokeballs' | 'berries' | 'machines' | 'training';

export const ITEM_TABS: { value: ItemTab; label: string; pockets: string[]; color: string }[] = [
  { value: 'pokeballs', label: 'Pokeballs', pockets: ['pokeballs'], color: '#CC3333' },
  { value: 'berries', label: 'Berries', pockets: ['berries'], color: '#5DAB5A' },
  { value: 'machines', label: 'MT & MO', pockets: ['machines'], color: '#4F60E2' },
  { value: 'training', label: 'Training', pockets: ['battle', 'misc'], color: '#E08020' },
];
