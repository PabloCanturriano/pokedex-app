import { act, renderHook } from '@testing-library/react-native';

import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
   it('returns the initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('hello', 400));
      expect(result.current).toBe('hello');
   });

   it('does not update before the delay elapses', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
         initialProps: { value: 'a' },
      });

      rerender({ value: 'b' });
      act(() => jest.advanceTimersByTime(300));

      expect(result.current).toBe('a');
   });

   it('updates after the delay elapses', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
         initialProps: { value: 'a' },
      });

      rerender({ value: 'b' });
      act(() => jest.advanceTimersByTime(400));

      expect(result.current).toBe('b');
   });

   it('resets the timer when value changes rapidly', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
         initialProps: { value: 'a' },
      });

      rerender({ value: 'b' });
      act(() => jest.advanceTimersByTime(200));
      rerender({ value: 'c' });
      act(() => jest.advanceTimersByTime(200));

      expect(result.current).toBe('a');

      act(() => jest.advanceTimersByTime(200));
      expect(result.current).toBe('c');
   });

   it('uses a custom delay', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
         initialProps: { value: 'x' },
      });

      rerender({ value: 'y' });
      act(() => jest.advanceTimersByTime(999));
      expect(result.current).toBe('x');

      act(() => jest.advanceTimersByTime(1));
      expect(result.current).toBe('y');
   });
});
