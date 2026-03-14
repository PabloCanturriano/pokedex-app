import { useState } from 'react';

import { ITEM_TABS, type ItemTab } from '@/constants/items';
import { useDebounce } from '@/hooks/useDebounce';

export function useItems() {
  const [activeTab, setActiveTab] = useState<ItemTab>('pokeballs');
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query);
  const search = debouncedQuery.trim() ? `%${debouncedQuery.trim()}%` : '%%';

  const activePockets = ITEM_TABS.find((t) => t.value === activeTab)!.pockets;

  function handleTabChange(value: string) {
    setActiveTab(value as ItemTab);
    setQuery('');
  }

  return { activeTab, query, setQuery, activePockets, search, handleTabChange };
}
