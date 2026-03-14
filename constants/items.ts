export type ItemTab = 'pokeballs' | 'berries' | 'machines' | 'training';

export const ITEM_TABS: { value: ItemTab; label: string; pockets: string[]; color: string }[] = [
   { value: 'pokeballs', label: 'itemTabs.pokeballs', pockets: ['pokeballs'], color: '#CC3333' },
   { value: 'berries', label: 'itemTabs.berries', pockets: ['berries'], color: '#5DAB5A' },
   { value: 'machines', label: 'itemTabs.machines', pockets: ['machines'], color: '#4F60E2' },
   { value: 'training', label: 'itemTabs.training', pockets: ['battle', 'misc'], color: '#E08020' },
];
