import { act, renderHook } from '@testing-library/react-native';

import { ITEM_TABS } from '@/constants/items';
import { useItems } from '@/hooks/useItems';

jest.useFakeTimers();

describe('useItems', () => {
   it('defaults to the pokeballs tab', () => {
      const { result } = renderHook(() => useItems());
      expect(result.current.activeTab).toBe('pokeballs');
   });

   it('defaults to empty query', () => {
      const { result } = renderHook(() => useItems());
      expect(result.current.query).toBe('');
   });

   it('returns %% search when query is empty', () => {
      const { result } = renderHook(() => useItems());
      // advance debounce so debouncedQuery settles
      act(() => jest.advanceTimersByTime(500));
      expect(result.current.search).toBe('%%');
   });

   it('formats search as %term% after debounce', () => {
      const { result } = renderHook(() => useItems());

      act(() => result.current.setQuery('berry'));
      act(() => jest.advanceTimersByTime(500));

      expect(result.current.search).toBe('%berry%');
   });

   it('trims whitespace when building search', () => {
      const { result } = renderHook(() => useItems());

      act(() => result.current.setQuery('  potion  '));
      act(() => jest.advanceTimersByTime(500));

      expect(result.current.search).toBe('%potion%');
   });

   it('returns %% when query is only whitespace', () => {
      const { result } = renderHook(() => useItems());

      act(() => result.current.setQuery('   '));
      act(() => jest.advanceTimersByTime(500));

      expect(result.current.search).toBe('%%');
   });

   it.each(ITEM_TABS)('activePockets and activeColor match config for $value tab', (tab) => {
      const { result } = renderHook(() => useItems());

      act(() => result.current.handleTabChange(tab.value));

      expect(result.current.activePockets).toEqual(tab.pockets);
      expect(result.current.activeColor).toBe(tab.color);
   });

   it('handleTabChange updates activeTab', () => {
      const { result } = renderHook(() => useItems());

      act(() => result.current.handleTabChange('berries'));

      expect(result.current.activeTab).toBe('berries');
   });

   it('handleTabChange resets query', () => {
      const { result } = renderHook(() => useItems());

      act(() => result.current.setQuery('something'));
      act(() => result.current.handleTabChange('machines'));

      expect(result.current.query).toBe('');
   });
});
