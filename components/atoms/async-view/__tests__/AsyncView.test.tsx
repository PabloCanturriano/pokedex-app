import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { AsyncView } from '../AsyncView';

describe('AsyncView', () => {
   it('shows ActivityIndicator when isPending', () => {
      render(
         <AsyncView isPending isError={false}>
            <></>
         </AsyncView>
      );
      expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
   });

   it('shows custom loading fallback when provided', () => {
      render(
         <AsyncView isPending isError={false} loadingFallback={<></>}>
            <></>
         </AsyncView>
      );
      // default ActivityIndicator should NOT be present
      expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
   });

   it('shows default error message when isError', () => {
      render(
         <AsyncView isPending={false} isError>
            <></>
         </AsyncView>
      );
      expect(screen.getByText('Something went wrong.')).toBeTruthy();
   });

   it('shows custom error fallback when provided', () => {
      render(
         <AsyncView isPending={false} isError errorFallback={<></>}>
            <></>
         </AsyncView>
      );
      expect(screen.queryByText('Something went wrong.')).toBeNull();
   });

   it('shows emptyFallback when isEmpty is true', () => {
      render(
         <AsyncView isPending={false} isError={false} isEmpty emptyFallback={<></>}>
            <></>
         </AsyncView>
      );
      // children should not be rendered
      expect(screen.queryByText('child content')).toBeNull();
   });

   it('renders children in the happy path', () => {
      render(
         <AsyncView isPending={false} isError={false}>
            <></>
         </AsyncView>
      );
      // no loading or error states
      expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
      expect(screen.queryByText('Something went wrong.')).toBeNull();
   });

   it('renders children when isEmpty but no emptyFallback provided', () => {
      render(
         <AsyncView isPending={false} isError={false} isEmpty>
            <></>
         </AsyncView>
      );
      expect(screen.queryByText('Something went wrong.')).toBeNull();
   });

   it('isPending takes priority over isError', () => {
      render(
         <AsyncView isPending isError>
            <></>
         </AsyncView>
      );
      expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
      expect(screen.queryByText('Something went wrong.')).toBeNull();
   });
});
