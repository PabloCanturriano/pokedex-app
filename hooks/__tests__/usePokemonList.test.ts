import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import * as fetchers from '@/api/pokemon/fetchers';
import { usePokemonList } from '@/hooks/usePokemonList';

jest.mock('@/api/pokemon/fetchers');

const mockFetchPokemonList = fetchers.fetchPokemonList as jest.MockedFunction<
   typeof fetchers.fetchPokemonList
>;

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
   mockFetchPokemonList.mockResolvedValue({ results: [], hasMore: false });
});

afterEach(() => {
   jest.clearAllMocks();
});

describe('usePokemonList', () => {
   it('calls fetchPokemonList with offset 0 and default sort on mount', async () => {
      const { result } = renderHook(() => usePokemonList(), { wrapper: makeWrapper() });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockFetchPokemonList).toHaveBeenCalledWith(0, 'number-asc');
   });

   it('passes the sortBy argument to fetchPokemonList', async () => {
      const { result } = renderHook(() => usePokemonList('name-desc'), {
         wrapper: makeWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockFetchPokemonList).toHaveBeenCalledWith(0, 'name-desc');
   });

   it('includes sortBy in the query key so different sorts are cached separately', async () => {
      const wrapper = makeWrapper();
      const { result: r1 } = renderHook(() => usePokemonList('number-asc'), { wrapper });
      const { result: r2 } = renderHook(() => usePokemonList('name-asc'), { wrapper });

      await waitFor(() => expect(r1.current.isSuccess).toBe(true));
      await waitFor(() => expect(r2.current.isSuccess).toBe(true));

      // each sort variant must trigger its own fetch
      expect(mockFetchPokemonList).toHaveBeenCalledWith(0, 'number-asc');
      expect(mockFetchPokemonList).toHaveBeenCalledWith(0, 'name-asc');
   });

   it('returns isPending true before data resolves', () => {
      // never-resolving promise to freeze in pending state
      mockFetchPokemonList.mockReturnValue(new Promise(() => {}));

      const { result } = renderHook(() => usePokemonList(), { wrapper: makeWrapper() });

      expect(result.current.isPending).toBe(true);
   });

   it('returns isError true when fetchPokemonList rejects', async () => {
      mockFetchPokemonList.mockRejectedValue(new Error('network error'));

      const { result } = renderHook(() => usePokemonList(), { wrapper: makeWrapper() });

      await waitFor(() => expect(result.current.isError).toBe(true));
   });
});
