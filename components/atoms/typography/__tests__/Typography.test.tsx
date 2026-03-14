import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { Colors } from '@/constants/theme';

import { Typography } from '../Typography';

describe('Typography', () => {
   it('renders children as text', () => {
      render(<Typography>Hello</Typography>);
      expect(screen.getByText('Hello')).toBeTruthy();
   });

   it('applies Colors.text as the base color', () => {
      render(<Typography>Test</Typography>);
      const el = screen.getByText('Test');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ color: Colors.text })])
      );
   });

   it('applies default font size when type is "default"', () => {
      render(<Typography type="default">Default</Typography>);
      const el = screen.getByText('Default');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ fontSize: 16 })])
      );
   });

   it('applies bold and large font size for type "title"', () => {
      render(<Typography type="title">Title</Typography>);
      const el = screen.getByText('Title');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ fontSize: 32, fontWeight: 'bold' })])
      );
   });

   it('applies semibold weight for type "defaultSemiBold"', () => {
      render(<Typography type="defaultSemiBold">SemiBold</Typography>);
      const el = screen.getByText('SemiBold');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ fontWeight: '600' })])
      );
   });

   it('applies bold for type "subtitle"', () => {
      render(<Typography type="subtitle">Subtitle</Typography>);
      const el = screen.getByText('Subtitle');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ fontSize: 20, fontWeight: 'bold' })])
      );
   });

   it('applies link color for type "link"', () => {
      render(<Typography type="link">Link</Typography>);
      const el = screen.getByText('Link');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ color: '#0a7ea4' })])
      );
   });

   it('allows overriding style via the style prop', () => {
      render(<Typography style={{ opacity: 0.5 }}>Custom</Typography>);
      const el = screen.getByText('Custom');
      expect(el.props.style).toEqual(
         expect.arrayContaining([expect.objectContaining({ opacity: 0.5 })])
      );
   });
});
