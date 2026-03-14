import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import * as fetchers from '@/api/pokemon/fetchers';
import { useItemsList } from '@/hooks/useItemsList';

jest.mock('@/api/pokemon/fetchers');

const mockFetchItems = fetchers.fetchItems as jest.MockedFunction<typeof fetchers.fetchItems>;

function makeWrapper() {
   const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
   });
   function Wrapper({ children }: { children: React.ReactNode }) {
      return React.createElement(QueryClientProvider, { client }, children);
   }
   return Wrapper;
}

beforeEach(() => {
   mockFetchItems.mockResolvedValue({ results: [], hasMore: false });
});

afterEach(() => {
   jest.clearAllMocks();
});

describe('useItemsList', () => {
   it('calls fetchItems with offset 0, the given pockets and search on mount', async () => {
      const { result } = renderHook(() => useItemsList(['pokeballs'], '%%'), {
         wrapper: makeWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockFetchItems).toHaveBeenCalledWith(0, ['pokeballs'], '%%');
   });

   it('passes multiple pockets to fetchItems', async () => {
      const { result } = renderHook(() => useItemsList(['battle', 'misc'], '%%'), {
         wrapper: makeWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockFetchItems).toHaveBeenCalledWith(0, ['battle', 'misc'], '%%');
   });

   it('passes a non-empty search term to fetchItems', async () => {
      const { result } = renderHook(() => useItemsList(['berries'], '%oran%'), {
         wrapper: makeWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockFetchItems).toHaveBeenCalledWith(0, ['berries'], '%oran%');
   });

   it('different pockets produce separate cache entries', async () => {
      const wrapper = makeWrapper();
      const { result: r1 } = renderHook(() => useItemsList(['pokeballs'], '%%'), { wrapper });
      const { result: r2 } = renderHook(() => useItemsList(['berries'], '%%'), { wrapper });

      await waitFor(() => expect(r1.current.isSuccess).toBe(true));
      await waitFor(() => expect(r2.current.isSuccess).toBe(true));

      expect(mockFetchItems).toHaveBeenCalledWith(0, ['pokeballs'], '%%');
      expect(mockFetchItems).toHaveBeenCalledWith(0, ['berries'], '%%');
   });

   it('different search terms produce separate cache entries', async () => {
      const wrapper = makeWrapper();
      const { result: r1 } = renderHook(() => useItemsList(['berries'], '%%'), { wrapper });
      const { result: r2 } = renderHook(() => useItemsList(['berries'], '%oran%'), { wrapper });

      await waitFor(() => expect(r1.current.isSuccess).toBe(true));
      await waitFor(() => expect(r2.current.isSuccess).toBe(true));

      expect(mockFetchItems).toHaveBeenCalledWith(0, ['berries'], '%%');
      expect(mockFetchItems).toHaveBeenCalledWith(0, ['berries'], '%oran%');
   });

   it('returns isError true when fetchItems rejects', async () => {
      mockFetchItems.mockRejectedValue(new Error('network error'));

      const { result } = renderHook(() => useItemsList(['pokeballs'], '%%'), {
         wrapper: makeWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
   });
});
